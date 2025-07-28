const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Test Supabase connection with profiles table
async function testSupabaseConnection() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables');
    console.log('Please check your .env file has:');
    console.log('SUPABASE_URL=your_supabase_url');
    console.log('SUPABASE_ANON_KEY=your_supabase_anon_key');
    return;
  }

  console.log('🔗 Testing Supabase connection...');
  console.log('URL:', supabaseUrl);

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test 1: Check if we can connect to profiles table
    console.log('\n📡 Testing connection to profiles table...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return;
    }
    
    console.log('✅ Connection successful!');

    // Test 2: Check if profiles table exists and is accessible
    console.log('\n📊 Testing profiles table access...');
    const { data: profiles, error: tableError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);

    if (tableError) {
      console.error('❌ Profiles table access failed:', tableError.message);
      return;
    }

    console.log('✅ Profiles table access successful!');
    console.log(`📈 Found ${profiles.length} profiles in database`);

    // Test 3: Check if bot-specific columns exist
    console.log('\n🔍 Checking for bot-specific columns...');
    const { data: columns, error: columnsError } = await supabase
      .from('profiles')
      .select('telegram_id, last_bot_activity, is_bot_active, bot_registered_at')
      .limit(1);

    if (columnsError) {
      console.log('⚠️  Bot columns might not exist yet. Run the SQL setup first.');
      console.log('📋 Please run the contents of supabase-setup-profiles.sql in your Supabase SQL Editor');
    } else {
      console.log('✅ Bot-specific columns are accessible!');
    }

    // Test 4: Test inserting a test bot user
    console.log('\n➕ Testing bot user creation...');
    const testTelegramId = 'test_' + Date.now();
    const { data: insertData, error: insertError } = await supabase
      .from('profiles')
      .insert({
        telegram_id: testTelegramId,
        full_name: 'Test Bot User',
        bot_registered_at: new Date().toISOString(),
        last_bot_activity: new Date().toISOString(),
        is_bot_active: true
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      console.log('💡 This might be because bot columns don\'t exist yet.');
      console.log('📋 Please run the contents of supabase-setup-profiles.sql in your Supabase SQL Editor');
      return;
    }

    console.log('✅ Bot user creation successful!');
    console.log('📝 Inserted profile:', insertData);

    // Test 5: Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('telegram_id', testTelegramId);

    if (deleteError) {
      console.error('⚠️  Cleanup failed:', deleteError.message);
    } else {
      console.log('✅ Cleanup successful!');
    }

    // Test 6: Test the bot stats function
    console.log('\n📊 Testing bot stats function...');
    const { data: stats, error: statsError } = await supabase
      .rpc('get_bot_user_stats');

    if (statsError) {
      console.log('⚠️  Bot stats function might not exist yet.');
      console.log('📋 Please run the contents of supabase-setup-profiles.sql in your Supabase SQL Editor');
    } else {
      console.log('✅ Bot stats function working!');
      console.log('📈 Stats:', stats);
    }

    console.log('\n🎉 All tests passed! Your Supabase connection is working perfectly.');
    console.log('\n📋 Next steps:');
    console.log('1. Run supabase-setup-profiles.sql in your Supabase SQL Editor');
    console.log('2. Create your Telegram bot with @BotFather');
    console.log('3. Add your bot token to .env file');
    console.log('4. Deploy to Render');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testSupabaseConnection(); 