const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Test production database connection
async function testProductionConnection() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  console.log('🔍 Testing production connection...');
  console.log('URL:', supabaseUrl);
  console.log('Key starts with:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'NOT SET');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables');
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test basic connection
    console.log('\n📡 Testing connection...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return;
    }
    
    console.log('✅ Connection successful!');

    // Test bot-specific columns
    console.log('\n🔍 Checking bot columns...');
    const { data: columns, error: columnError } = await supabase
      .from('profiles')
      .select('telegram_id, last_bot_activity, is_bot_active, bot_registered_at')
      .limit(1);

    if (columnError) {
      console.error('❌ Bot columns error:', columnError.message);
      console.log('💡 You may need to run the SQL setup script');
    } else {
      console.log('✅ Bot columns accessible!');
    }

    // Test bot stats function
    console.log('\n📊 Testing bot stats function...');
    const { data: stats, error: statsError } = await supabase
      .rpc('get_bot_user_stats');

    if (statsError) {
      console.error('❌ Bot stats function error:', statsError.message);
      console.log('💡 You may need to run the SQL setup script');
    } else {
      console.log('✅ Bot stats function working!');
      console.log('📈 Stats:', stats);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testProductionConnection(); 