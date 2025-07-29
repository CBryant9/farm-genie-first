-- Add subscription-related columns to profiles table
-- This script adds the necessary columns for subscription management

-- Add subscription columns to profiles table
DO $$ 
BEGIN
    -- Add stripe_customer_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id') THEN
        ALTER TABLE profiles ADD COLUMN stripe_customer_id TEXT;
        RAISE NOTICE 'Added stripe_customer_id column to profiles table';
    ELSE
        RAISE NOTICE 'stripe_customer_id column already exists';
    END IF;
END $$;

DO $$ 
BEGIN
    -- Add subscription_status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'subscription_status') THEN
        ALTER TABLE profiles ADD COLUMN subscription_status TEXT 
            CHECK (subscription_status IN ('active', 'inactive', 'cancelled'));
        RAISE NOTICE 'Added subscription_status column to profiles table';
    ELSE
        RAISE NOTICE 'subscription_status column already exists';
    END IF;
END $$;

DO $$ 
BEGIN
    -- Add subscription_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'subscription_id') THEN
        ALTER TABLE profiles ADD COLUMN subscription_id TEXT;
        RAISE NOTICE 'Added subscription_id column to profiles table';
    ELSE
        RAISE NOTICE 'subscription_id column already exists';
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for secure access

-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Web app can update subscription data (for authenticated users and service role)
DROP POLICY IF EXISTS "Web app can update subscription data" ON profiles;
CREATE POLICY "Web app can update subscription data" ON profiles
    FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Bot can access profiles by telegram_id
DROP POLICY IF EXISTS "Bot can access profiles by telegram_id" ON profiles;
CREATE POLICY "Bot can access profiles by telegram_id" ON profiles
    FOR ALL USING (telegram_id IS NOT NULL);

-- Service role can perform all operations
DROP POLICY IF EXISTS "Service role can perform all operations" ON profiles;
CREATE POLICY "Service role can perform all operations" ON profiles
    FOR ALL USING (auth.role() = 'service_role');

-- Create helper functions for subscription management

-- Function to update subscription status
CREATE OR REPLACE FUNCTION update_subscription_status(
    user_id UUID,
    new_status TEXT,
    stripe_customer_id_param TEXT DEFAULT NULL,
    subscription_id_param TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE profiles 
    SET 
        subscription_status = new_status,
        stripe_customer_id = COALESCE(stripe_customer_id_param, stripe_customer_id),
        subscription_id = COALESCE(subscription_id_param, subscription_id),
        updated_at = NOW()
    WHERE id = user_id;
    
    RETURN FOUND;
END;
$$;

-- Function to get subscription info by telegram_id
CREATE OR REPLACE FUNCTION get_subscription_by_telegram_id(telegram_user_id TEXT)
RETURNS TABLE(
    subscription_status TEXT,
    stripe_customer_id TEXT,
    subscription_id TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.subscription_status,
        p.stripe_customer_id,
        p.subscription_id
    FROM profiles p
    WHERE p.telegram_id = telegram_user_id;
END;
$$;

-- Function to update subscription from bot context
CREATE OR REPLACE FUNCTION update_subscription_from_bot(
    telegram_user_id TEXT,
    new_status TEXT,
    stripe_customer_id_param TEXT DEFAULT NULL,
    subscription_id_param TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE profiles 
    SET 
        subscription_status = new_status,
        stripe_customer_id = COALESCE(stripe_customer_id_param, stripe_customer_id),
        subscription_id = COALESCE(subscription_id_param, subscription_id),
        updated_at = NOW()
    WHERE telegram_id = telegram_user_id;
    
    RETURN FOUND;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION update_subscription_status(UUID, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_subscription_by_telegram_id(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION update_subscription_from_bot(TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('stripe_customer_id', 'subscription_status', 'subscription_id')
ORDER BY column_name;

-- Check RLS policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Test the functions (optional - uncomment to test)
-- SELECT update_subscription_status('your-user-id-here', 'active', 'cus_test123', 'sub_test123');
-- SELECT * FROM get_subscription_by_telegram_id('your-telegram-id-here'); 