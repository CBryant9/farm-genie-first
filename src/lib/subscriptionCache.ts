/**
 * In-memory caching system for user subscription statuses
 * Provides fast access to subscription data with automatic cleanup
 * 
 * TODO: STEP 5 TO ADD LATER - Stripe Webhook Integration
 * When implementing Stripe webhooks, use the invalidate() method to clear cache
 * when subscription status changes, ensuring immediate updates for users.
 * 
 * Webhook events to handle:
 * - customer.subscription.updated
 * - customer.subscription.deleted  
 * - invoice.payment_failed
 * - invoice.payment_succeeded
 *
 * Find users by stripe_customer_id and call invalidate(telegramId) to clear cache.
 */

export interface SubscriptionCacheEntry {
  telegramId: number;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | null;
  stripeCustomerId?: string;
  subscriptionId?: string;
  cachedAt: Date;
  expiresAt: Date;
}

class SubscriptionCache {
  private cache: Map<number, SubscriptionCacheEntry> = new Map();
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private cleanupTimer?: ReturnType<typeof setInterval>;
  private totalRequests = 0;
  private cacheHits = 0;

  constructor() {
    // Start automatic cleanup
    this.cleanupTimer = setInterval(() => this.cleanupExpiredEntries(), this.CLEANUP_INTERVAL);
  }

  /**
   * Get subscription status for a user
   * Checks cache first, then falls back to Supabase
   */
  async getSubscriptionStatus(telegramId: number): Promise<{
    subscriptionStatus: 'active' | 'inactive' | 'cancelled' | null;
    stripeCustomerId?: string;
    subscriptionId?: string;
    fromCache: boolean;
  }> {
    this.totalRequests++;

    // Check cache first
    const cachedEntry = this.get(telegramId);
    if (cachedEntry) {
      this.cacheHits++;
      console.log(`📦 Cache HIT for user ${telegramId}`);
      return {
        subscriptionStatus: cachedEntry.subscriptionStatus,
        stripeCustomerId: cachedEntry.stripeCustomerId,
        subscriptionId: cachedEntry.subscriptionId,
        fromCache: true
      };
    }

    // Cache miss - fetch from Supabase
    console.log(`📦 Cache MISS for user ${telegramId}, fetching from Supabase...`);
    const supabaseResult = await this.fetchFromSupabase(telegramId);
    
    // Cache the result
    if (supabaseResult) {
      this.set(telegramId, supabaseResult);
    }

    return {
      subscriptionStatus: supabaseResult?.subscriptionStatus || null,
      stripeCustomerId: supabaseResult?.stripeCustomerId,
      subscriptionId: supabaseResult?.subscriptionId,
      fromCache: false
    };
  }

  /**
   * Set subscription status in cache
   */
  set(telegramId: number, data: {
    subscriptionStatus: 'active' | 'inactive' | 'cancelled' | null;
    stripeCustomerId?: string;
    subscriptionId?: string;
  }): void {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.CACHE_DURATION);

    const entry: SubscriptionCacheEntry = {
      telegramId,
      subscriptionStatus: data.subscriptionStatus,
      stripeCustomerId: data.stripeCustomerId,
      subscriptionId: data.subscriptionId,
      cachedAt: now,
      expiresAt
    };

    this.cache.set(telegramId, entry);
    console.log(`💾 Cached subscription status for user ${telegramId}: ${data.subscriptionStatus}`);
  }

  /**
   * Get entry from cache (internal method)
   */
  private get(telegramId: number): SubscriptionCacheEntry | null {
    const entry = this.cache.get(telegramId);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (new Date() > entry.expiresAt) {
      this.cache.delete(telegramId);
      console.log(`⏰ Cache entry expired for user ${telegramId}`);
      return null;
    }

    return entry;
  }

  /**
   * Fetch subscription data from Supabase
   */
  private async fetchFromSupabase(telegramId: number): Promise<{
    subscriptionStatus: 'active' | 'inactive' | 'cancelled' | null;
    stripeCustomerId?: string;
    subscriptionId?: string;
  } | null> {
    try {
      // Dynamic import to avoid circular dependencies
      const { UserService } = await import('./supabase');
      const user = await UserService.getUserByTelegramId(telegramId.toString());
      
      if (user) {
        return {
          subscriptionStatus: user.subscription_status || null,
          stripeCustomerId: user.stripe_customer_id,
          subscriptionId: user.subscription_id
        };
      }
      
      return null;
    } catch (error) {
      console.error(`❌ Error fetching subscription data for user ${telegramId}:`, error);
      return null;
    }
  }

  /**
   * Invalidate cache for a specific user
   */
  invalidate(telegramId: number): void {
    const deleted = this.cache.delete(telegramId);
    if (deleted) {
      console.log(`🔄 Cache invalidated for user ${telegramId}`);
    }
  }

  /**
   * Invalidate all cache entries
   */
  invalidateAll(): void {
    const count = this.cache.size;
    this.cache.clear();
    console.log(`🔄 All cache entries invalidated (${count} entries)`);
  }

  /**
   * Clean up expired entries
   */
  private cleanupExpiredEntries(): void {
    const now = new Date();
    let cleanedCount = 0;

    for (const [telegramId, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(telegramId);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired cache entries`);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    totalEntries: number;
    activeEntries: number;
    expiredEntries: number;
    cacheHitRate: number;
    totalRequests: number;
    cacheHits: number;
  } {
    const now = new Date();
    let activeEntries = 0;
    let expiredEntries = 0;

    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expiredEntries++;
      } else {
        activeEntries++;
      }
    }

    const cacheHitRate = this.totalRequests > 0 ? (this.cacheHits / this.totalRequests) * 100 : 0;

    return {
      totalEntries: this.cache.size,
      activeEntries,
      expiredEntries,
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      totalRequests: this.totalRequests,
      cacheHits: this.cacheHits
    };
  }

  /**
   * Get all cache entries (for debugging)
   */
  getAllEntries(): SubscriptionCacheEntry[] {
    return Array.from(this.cache.values());
  }

  /**
   * Check if user has active subscription
   */
  async isSubscriptionActive(telegramId: number): Promise<boolean> {
    const result = await this.getSubscriptionStatus(telegramId);
    return result.subscriptionStatus === 'active';
  }

  /**
   * Check if user has any subscription
   */
  async hasSubscription(telegramId: number): Promise<boolean> {
    const result = await this.getSubscriptionStatus(telegramId);
    return result.subscriptionStatus !== null;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.cache.clear();
    console.log('🧹 SubscriptionCache destroyed');
  }
}

// Export singleton instance
export const subscriptionCache = new SubscriptionCache(); 