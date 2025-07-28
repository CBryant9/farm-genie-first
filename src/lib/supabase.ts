import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TypeScript interfaces for our data
export interface Profile {
  id: string;
  telegram_id?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  bot_registered_at?: string;
  last_bot_activity?: string;
  is_bot_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  total_users: number;
  active_users: number;
  new_users_today: number;
}

// Database operations
export class UserService {
  // Get or create user in profiles table
  static async getOrCreateUser(telegramId: string, userData: {
    username?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<Profile> {
    // First, try to get existing user by telegram_id
    const { data: existingUser, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(`Error fetching user: ${fetchError.message}`);
    }

    if (existingUser) {
      // Update last bot activity and user info
      const { data: updatedUser, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          last_bot_activity: new Date().toISOString(),
          full_name: userData.first_name && userData.last_name 
            ? `${userData.first_name} ${userData.last_name}`.trim()
            : userData.first_name || userData.last_name || existingUser.full_name,
          is_bot_active: true
        })
        .eq('telegram_id', telegramId)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Error updating user: ${updateError.message}`);
      }

      return updatedUser;
    }

    // Create new user in profiles table
    const { data: newUser, error: createError } = await supabase
      .from('profiles')
      .insert({
        telegram_id: telegramId,
        full_name: userData.first_name && userData.last_name 
          ? `${userData.first_name} ${userData.last_name}`.trim()
          : userData.first_name || userData.last_name,
        bot_registered_at: new Date().toISOString(),
        last_bot_activity: new Date().toISOString(),
        is_bot_active: true
      })
      .select()
      .single();

    if (createError) {
      throw new Error(`Error creating user: ${createError.message}`);
    }

    return newUser;
  }

  // Get user stats for bot users only
  static async getUserStats(): Promise<UserStats> {
    const { data: stats, error } = await supabase
      .rpc('get_bot_user_stats');

    if (error) {
      throw new Error(`Error getting user stats: ${error.message}`);
    }

    return {
      total_users: stats?.total_bot_users || 0,
      active_users: stats?.active_bot_users || 0,
      new_users_today: stats?.new_bot_users_today || 0
    };
  }

  // Get user by telegram ID
  static async getUserByTelegramId(telegramId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Error fetching user: ${error.message}`);
    }

    return data;
  }

  // Get all bot users (for admin purposes)
  static async getBotUsers(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .not('telegram_id', 'is', null)
      .order('last_bot_activity', { ascending: false });

    if (error) {
      throw new Error(`Error fetching bot users: ${error.message}`);
    }

    return data || [];
  }

  // Update user's bot activity
  static async updateBotActivity(telegramId: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        last_bot_activity: new Date().toISOString(),
        is_bot_active: true
      })
      .eq('telegram_id', telegramId);

    if (error) {
      throw new Error(`Error updating bot activity: ${error.message}`);
    }
  }

  // Deactivate user's bot access
  static async deactivateBotUser(telegramId: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        is_bot_active: false,
        last_bot_activity: new Date().toISOString()
      })
      .eq('telegram_id', telegramId);

    if (error) {
      throw new Error(`Error deactivating bot user: ${error.message}`);
    }
  }
} 