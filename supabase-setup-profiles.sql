-- Farm Genie Bot - Database Setup for Existing Profiles Table
-- Run this SQL in your Supabase SQL Editor to add bot fields to your existing profiles table

-- Add bot-specific columns to existing profiles table
-- (Only add columns that don't already exist)

-- Add telegram_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'telegram_id'
    ) THEN
        ALTER TABLE profiles ADD COLUMN telegram_id VARCHAR(255) UNIQUE;
    END IF;
END $$;

-- Add bot-specific activity tracking if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'last_bot_activity'
    ) THEN
        ALTER TABLE profiles ADD COLUMN last_bot_activity TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Add bot status if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'is_bot_active'
    ) THEN
        ALTER TABLE profiles ADD COLUMN is_bot_active BOOLEAN;
    END IF;
END $$;

-- Add bot registration date if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'bot_registered_at'
    ) THEN
        ALTER TABLE profiles ADD COLUMN bot_registered_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_telegram_id ON profiles(telegram_id);
CREATE INDEX IF NOT EXISTS idx_profiles_last_bot_activity ON profiles(last_bot_activity);
CREATE INDEX IF NOT EXISTS idx_profiles_is_bot_active ON profiles(is_bot_active);

-- Create a function to get bot user statistics
CREATE OR REPLACE FUNCTION get_bot_user_stats()
RETURNS TABLE (
    total_bot_users BIGINT,
    active_bot_users BIGINT,
    new_bot_users_today BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) FILTER (WHERE telegram_id IS NOT NULL)::BIGINT as total_bot_users,
        COUNT(*) FILTER (WHERE telegram_id IS NOT NULL AND is_bot_active = true)::BIGINT as active_bot_users,
        COUNT(*) FILTER (WHERE telegram_id IS NOT NULL AND bot_registered_at >= CURRENT_DATE)::BIGINT as new_bot_users_today
    FROM profiles;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions (if not already granted)
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON profiles TO anon;
GRANT EXECUTE ON FUNCTION get_bot_user_stats() TO anon; 