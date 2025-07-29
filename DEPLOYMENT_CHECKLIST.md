# 🚀 Farm Genie Bot Deployment Checklist

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables
- [ ] `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- [ ] `SUPABASE_URL` - Your Supabase project URL
- [ ] `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `3000`
- [ ] `WEBHOOK_URL` - Your Render app URL (e.g., `https://farm-genie-first.onrender.com`)
- [ ] `APP_URL` - Your web app URL for subscription management

### ✅ Database Setup
- [ ] Run `supabase-add-subscription-columns.sql` in Supabase SQL Editor
- [ ] Verify subscription columns added to `profiles` table:
  - `stripe_customer_id` (TEXT)
  - `subscription_status` (TEXT with CHECK constraint)
  - `subscription_id` (TEXT)
- [ ] Verify RLS policies are in place
- [ ] Verify helper functions created:
  - `update_subscription_status()`
  - `get_subscription_by_telegram_id()`
  - `update_subscription_from_bot()`

### ✅ Code Review
- [ ] All TypeScript compilation errors resolved
- [ ] All imports and exports working correctly
- [ ] Environment variables properly configured
- [ ] Error handling in place
- [ ] Logging statements added

## 🚀 Deployment Steps

### 1. Git Setup
```bash
# Ensure all changes are committed
git add .
git commit -m "Complete smart bot system with subscription integration"

# Push to GitHub
git push origin main
```

### 2. Render Deployment
- [ ] Connect GitHub repository to Render
- [ ] Configure as Web Service
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add all environment variables
- [ ] Deploy the service

### 3. Post-Deployment Verification
- [ ] Check Render logs for any errors
- [ ] Verify bot starts successfully
- [ ] Test health check endpoint: `https://your-app.onrender.com/health`
- [ ] Test cache stats endpoint: `https://your-app.onrender.com/cache-stats`
- [ ] Verify webhook is set correctly

## 🧪 Testing Checklist

### Bot Functionality Tests
- [ ] **New User Flow**
  - Send `/start` to bot
  - Bot asks for email
  - Provide valid email from existing profile
  - Bot successfully links account
  - User gets welcome message

- [ ] **Returning User Flow**
  - Send `/start` to bot
  - Bot recognizes existing user
  - Shows appropriate subscription status
  - Provides relevant commands

- [ ] **Subscription Status Tests**
  - Test with active subscription
  - Test with inactive subscription
  - Test with cancelled subscription
  - Test with no subscription

- [ ] **Command Tests**
  - `/help` - Shows available commands
  - `/status` - Shows user status and subscription info
  - `/profile` - Shows detailed profile information

### Cache System Tests
- [ ] **Cache Hit/Miss**
  - First request should miss cache (database query)
  - Second request should hit cache (fast response)
  - Check cache stats endpoint

- [ ] **Cache Invalidation**
  - Test cache invalidation endpoint
  - Verify cache is cleared for specific user
  - Check that fresh data is fetched

- [ ] **Cache Cleanup**
  - Monitor cache stats over time
  - Verify expired entries are cleaned up
  - Check memory usage

### State Management Tests
- [ ] **Email Verification State**
  - Start email verification flow
  - Check state is set correctly
  - Verify state expires after timeout
  - Test state cleanup

- [ ] **State Statistics**
  - Monitor state manager stats
  - Verify cleanup metrics
  - Check for memory leaks

## 📊 Monitoring Checklist

### Health Monitoring
- [ ] Set up health check monitoring
- [ ] Monitor response times
- [ ] Track error rates
- [ ] Monitor memory usage

### Bot Performance
- [ ] Monitor message processing times
- [ ] Track cache hit rates
- [ ] Monitor database query performance
- [ ] Check webhook delivery success

### User Experience
- [ ] Monitor user engagement
- [ ] Track command usage
- [ ] Monitor subscription status changes
- [ ] Check error messages sent to users

## 🔧 Troubleshooting Guide

### Common Issues

#### Bot Not Responding
- [ ] Check Render logs for errors
- [ ] Verify webhook URL is correct
- [ ] Check if bot token is valid
- [ ] Verify environment variables are set

#### Database Connection Issues
- [ ] Check Supabase URL and key
- [ ] Verify RLS policies are correct
- [ ] Check if database is accessible
- [ ] Review SQL function permissions

#### Cache Issues
- [ ] Check cache stats endpoint
- [ ] Verify cache invalidation is working
- [ ] Monitor memory usage
- [ ] Check cache cleanup logs

#### Email Verification Issues
- [ ] Verify email format validation
- [ ] Check if email exists in database
- [ ] Monitor state management
- [ ] Check linking process logs

### Debug Endpoints
- [ ] `/health` - Overall system health
- [ ] `/cache-stats` - Cache performance metrics
- [ ] `/test-webhook` - Webhook configuration info
- [ ] `/invalidate-cache/:telegramId` - Manual cache invalidation

## 🔄 Maintenance Tasks

### Regular Monitoring
- [ ] Daily: Check health endpoint
- [ ] Weekly: Review cache performance
- [ ] Monthly: Analyze user engagement
- [ ] Quarterly: Review error logs

### Database Maintenance
- [ ] Monitor subscription status updates
- [ ] Check for orphaned bot records
- [ ] Review RLS policy effectiveness
- [ ] Optimize database queries

### Cache Maintenance
- [ ] Monitor cache hit rates
- [ ] Adjust cache duration if needed
- [ ] Review memory usage patterns
- [ ] Clean up expired entries

## 🚀 Future Enhancements

### Phase 2: Stripe Integration
- [ ] Implement Stripe webhook handler
- [ ] Add cache invalidation for subscription changes
- [ ] Set up webhook endpoints
- [ ] Test subscription status updates

### Phase 3: Advanced Features
- [ ] Add farming-specific commands
- [ ] Implement weather integration
- [ ] Add crop management features
- [ ] Implement market price alerts

### Phase 4: Analytics
- [ ] Add user analytics
- [ ] Track feature usage
- [ ] Monitor subscription conversions
- [ ] Implement A/B testing

## 📞 Support Information

### Emergency Contacts
- [ ] Render Support: https://render.com/docs/help
- [ ] Supabase Support: https://supabase.com/support
- [ ] Telegram Bot API: https://core.telegram.org/bots/api

### Useful Commands
```bash
# Check bot status
curl https://your-app.onrender.com/health

# Check cache stats
curl https://your-app.onrender.com/cache-stats

# Invalidate user cache
curl -X POST https://your-app.onrender.com/invalidate-cache/123456789

# Test webhook info
curl https://your-app.onrender.com/test-webhook
```

### Log Locations
- [ ] Render Dashboard → Your Service → Logs
- [ ] Supabase Dashboard → Logs
- [ ] Telegram Bot API Logs (if available)

---

**🎉 Deployment Complete!**

Your Farm Genie bot is now live and ready to serve users. Monitor the system closely during the first few days and be prepared to make adjustments based on user feedback and system performance. 