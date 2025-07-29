/**
 * State management for user conversation flow
 * Handles email verification states and automatic cleanup
 */

export interface UserState {
  telegramId: number;
  state: 'awaiting_email' | 'verified' | 'expired';
  email?: string;
  createdAt: Date;
  lastActivity: Date;
}

export class StateManager {
  private states: Map<number, UserState> = new Map();
  private readonly CLEANUP_INTERVAL = 30 * 60 * 1000; // 30 minutes
  private readonly STATE_TIMEOUT = 10 * 60 * 1000; // 10 minutes
  private cleanupTimer?: ReturnType<typeof setInterval>;

  constructor() {
    // Start automatic cleanup
    this.cleanupTimer = setInterval(() => {
      this.cleanupOldStates();
    }, this.CLEANUP_INTERVAL);
  }

  /**
   * Set user state
   */
  setState(telegramId: number, state: UserState['state'], email?: string): void {
    const now = new Date();
    this.states.set(telegramId, {
      telegramId,
      state,
      email,
      createdAt: now,
      lastActivity: now
    });
    console.log(`📝 State set for user ${telegramId}: ${state}`);
  }

  /**
   * Get user state
   */
  getState(telegramId: number): UserState | null {
    const state = this.states.get(telegramId);
    if (!state) {
      return null;
    }

    // Check if state has expired
    const now = new Date();
    if (now.getTime() - state.lastActivity.getTime() > this.STATE_TIMEOUT) {
      this.states.delete(telegramId);
      console.log(`⏰ State expired for user ${telegramId}`);
      return null;
    }

    // Update last activity
    state.lastActivity = now;
    return state;
  }

  /**
   * Update user state
   */
  updateState(telegramId: number, updates: Partial<UserState>): void {
    const state = this.getState(telegramId);
    if (state) {
      Object.assign(state, updates);
      state.lastActivity = new Date();
      console.log(`📝 State updated for user ${telegramId}`);
    }
  }

  /**
   * Clear user state
   */
  clearState(telegramId: number): void {
    const deleted = this.states.delete(telegramId);
    if (deleted) {
      console.log(`🗑️ State cleared for user ${telegramId}`);
    }
  }

  /**
   * Check if user is in specific state
   */
  isInState(telegramId: number, state: UserState['state']): boolean {
    const userState = this.getState(telegramId);
    return userState?.state === state;
  }

  /**
   * Clean up old states
   */
  private cleanupOldStates(): void {
    const now = new Date();
    let cleanedCount = 0;

    for (const [telegramId, state] of this.states.entries()) {
      if (now.getTime() - state.lastActivity.getTime() > this.STATE_TIMEOUT) {
        this.states.delete(telegramId);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired states`);
    }
  }

  /**
   * Get statistics
   */
  getStats(): {
    totalStates: number;
    awaitingEmail: number;
    verified: number;
    expired: number;
  } {
    let awaitingEmail = 0;
    let verified = 0;
    let expired = 0;

    for (const state of this.states.values()) {
      switch (state.state) {
        case 'awaiting_email':
          awaitingEmail++;
          break;
        case 'verified':
          verified++;
          break;
        case 'expired':
          expired++;
          break;
      }
    }

    return {
      totalStates: this.states.size,
      awaitingEmail,
      verified,
      expired
    };
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.states.clear();
    console.log('🧹 StateManager destroyed');
  }
}

// Export singleton instance
export const stateManager = new StateManager(); 