// Utility functions for subscription cache management
// These can be used by your web app to invalidate cache when subscription status changes

// TODO: STEP 5 TO ADD LATER - Stripe Webhook Integration for Cache Invalidation
// Update existing Stripe webhook handler to include cache invalidation for the Telegram bot.
// When subscription status changes, clear the user's cached status so they get immediate feedback.
//
// Add cache clearing to these webhook events:
// - customer.subscription.updated
// - customer.subscription.deleted  
// - invoice.payment_failed
// - invoice.payment_succeeded
//
// Find users by stripe_customer_id and clear their telegram bot cache
// Include error handling if user not found or doesn't have telegram_id
// Import the cache invalidation function from this module
//
// Users should get immediate subscription status updates in Telegram when their payment status changes.
// For now, subscription status will update when cache expires naturally (15 minute delay max).

import { subscriptionCache } from './subscriptionCache';

/**
 * Invalidate cache for a specific user
 * Call this when a user's subscription status changes in your web app
 */
export function invalidateUserCache(telegramId: number): void {
  subscriptionCache.invalidate(telegramId);
  console.log(`🔄 Cache invalidated for user ${telegramId} (called from web app)`);
}

/**
 * Invalidate cache for multiple users
 * Call this for bulk subscription updates
 */
export function invalidateMultipleUsers(telegramIds: number[]): void {
  telegramIds.forEach(id => subscriptionCache.invalidate(id));
  console.log(`🔄 Cache invalidated for ${telegramIds.length} users (called from web app)`);
}

/**
 * Invalidate all cache entries
 * Use sparingly - only for major system updates
 */
export function invalidateAllCache(): void {
  subscriptionCache.invalidateAll();
  console.log('🔄 All cache entries invalidated (called from web app)');
}

/**
 * Get cache statistics
 * Useful for monitoring cache performance
 */
export function getCacheStats() {
  return subscriptionCache.getStats();
}

/**
 * Check if a user's subscription is active (with caching)
 */
export async function isUserSubscriptionActive(telegramId: number): Promise<boolean> {
  return await subscriptionCache.isSubscriptionActive(telegramId);
}

/**
 * Check if a user has any subscription (with caching)
 */
export async function userHasSubscription(telegramId: number): Promise<boolean> {
  return await subscriptionCache.hasSubscription(telegramId);
}

/**
 * Get user subscription status (with caching)
 */
export async function getUserSubscriptionStatus(telegramId: number) {
  return await subscriptionCache.getSubscriptionStatus(telegramId);
}

/**
 * Pre-warm cache for a user
 * Call this when you know a user will be active soon
 */
export async function preWarmUserCache(telegramId: number): Promise<void> {
  try {
    await subscriptionCache.getSubscriptionStatus(telegramId);
    console.log(`🔥 Cache pre-warmed for user ${telegramId}`);
  } catch (error) {
    console.error(`❌ Failed to pre-warm cache for user ${telegramId}:`, error);
  }
}

/**
 * Pre-warm cache for multiple users
 * Useful for batch operations
 */
export async function preWarmMultipleUsers(telegramIds: number[]): Promise<void> {
  const promises = telegramIds.map(id => preWarmUserCache(id));
  await Promise.allSettled(promises);
  console.log(`🔥 Cache pre-warmed for ${telegramIds.length} users`);
}

/**
 * Web app integration helper
 * Call this from your web app when subscription status changes
 */
export async function handleSubscriptionChange(
  telegramId: number, 
  newStatus: 'active' | 'inactive' | 'cancelled' | null
): Promise<void> {
  // Invalidate the cache for this user
  invalidateUserCache(telegramId);
  
  // Optionally pre-warm the cache with the new status
  // This ensures the next bot request gets the updated status immediately
  setTimeout(() => {
    preWarmUserCache(telegramId);
  }, 1000); // Small delay to ensure database update is complete
  
  console.log(`🔄 Subscription status changed for user ${telegramId}: ${newStatus}`);
}

/**
 * Bulk subscription update helper
 * Call this from your web app for bulk subscription changes
 */
export async function handleBulkSubscriptionChange(
  changes: Array<{ telegramId: number; newStatus: 'active' | 'inactive' | 'cancelled' | null }>
): Promise<void> {
  const telegramIds = changes.map(change => change.telegramId);
  
  // Invalidate cache for all affected users
  invalidateMultipleUsers(telegramIds);
  
  // Pre-warm cache for all users
  setTimeout(() => {
    preWarmMultipleUsers(telegramIds);
  }, 1000);
  
  console.log(`🔄 Bulk subscription changes processed for ${changes.length} users`);
}

/**
 * Cache health check
 * Returns cache health information
 */
export function getCacheHealth() {
  const stats = getCacheStats();
  
  return {
    isHealthy: stats.totalEntries >= 0,
    totalEntries: stats.totalEntries,
    activeEntries: stats.activeEntries,
    expiredEntries: stats.expiredEntries,
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString()
  };
} 