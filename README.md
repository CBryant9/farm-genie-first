# Farm Genie Telegram Bot 🌱

A Node.js Telegram bot with Supabase integration, built with TypeScript. This bot connects to your existing Supabase project and integrates with your existing `profiles` table for unified user management.

## 🚀 Quick Start - Get Online ASAP

**Goal**: Get your bot running online in under 30 minutes!

### Phase 1: Connect to Your Existing Supabase Project (5 minutes)

Since you already have a Supabase project for your web app, we'll integrate this bot with your existing `profiles` table:

1. **Get your Supabase credentials**:
   - Go to your existing Supabase project dashboard
   - Navigate to Settings → API
   - Copy your **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - Copy your **anon public key** (starts with `eyJ...`)

2. **Set up the bot-specific fields**:
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase-setup-profiles.sql`
   - Click "Run" to add bot fields to your existing profiles table

### Phase 2: Create Your Telegram Bot (5 minutes)

1. **Get your bot token**:
   - Open Telegram and search for `@BotFather`
   - Send `/newbot`
   - Name your bot (e.g., "Farm Genie")
   - Choose a username ending with 'bot' (e.g., "farm_genie_bot")
   - Copy the token BotFather gives you

### Phase 3: Deploy to Render (15 minutes)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/farm-genie-bot.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `farm-genie-bot`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
   - Add these environment variables:
     ```
     TELEGRAM_BOT_TOKEN=your_bot_token
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     NODE_ENV=production
     ```
   - Click "Create Web Service"

3. **Set up webhook**:
   - Once deployed, visit: `https://your-app-name.onrender.com/test-webhook`
   - Your bot is now live! 🎉

### Phase 4: Test Your Bot (5 minutes)

1. **Test the bot**:
   - Open Telegram and find your bot
   - Send `/start`
   - Try `/status` to verify Supabase connection
   - Check your Supabase dashboard to see user data in your profiles table

---

## 📋 Detailed Setup Guide

### Prerequisites

- ✅ **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- ✅ **A Telegram account** - [Download Telegram](https://telegram.org/)
- ✅ **Your existing Supabase project** - You already have this!

### Step 1: Connect to Your Existing Supabase Project

**Why this approach?** 
- Your bot and web app share the same `profiles` table
- User data is completely unified across both platforms
- No duplicate user records or data synchronization needed
- You can manage everything from one place
- Existing web app users can seamlessly use the bot

1. **Get your Supabase credentials**:
   - Go to your existing Supabase project dashboard
   - Navigate to Settings → API
   - Copy your **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - Copy your **anon public key** (starts with `eyJ...`)

2. **Set up the bot-specific fields**:
   - In your Supabase dashboard, go to SQL Editor
   - Copy the entire contents of the `supabase-setup-profiles.sql` file
   - Paste it into the SQL Editor
   - Click "Run" to execute the SQL
   - This adds bot-specific fields to your existing `profiles` table

### Step 2: Create Your Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** with BotFather by clicking "Start"
3. **Send the command**: `/newbot`
4. **Follow the instructions**:
   - Enter a name for your bot (e.g., "Farm Genie Bot")
   - Enter a username for your bot (must end with 'bot', e.g., "farm_genie_bot")
5. **Copy the bot token** that BotFather gives you (it looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 3: Set Up Your Local Environment

1. **Clone or download this project** to your computer
2. **Open a terminal/command prompt** in the project folder
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create your environment file**:
   - Copy the `env.example` file and rename it to `.env`
   - Open the `.env` file in a text editor
   - Replace the placeholder values with your actual credentials:

   ```env
   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=your_actual_bot_token_from_step_2
   
   # Supabase Configuration (from your existing project)
   SUPABASE_URL=your_supabase_project_url_from_step_1
   SUPABASE_ANON_KEY=your_supabase_anon_key_from_step_1
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

### Step 4: Test Your Bot Locally

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start the bot**:
   ```bash
   npm run dev
   ```

3. **Test your bot**:
   - Open Telegram
   - Search for your bot username (the one you created in Step 2)
   - Click "Start" or send `/start`
   - Try the commands: `/help` and `/status`

4. **Check the health endpoint**:
   - Open your web browser
   - Go to: `http://localhost:3000/health`
   - You should see a JSON response confirming the bot is running

### Step 5: Deploy to Render (Recommended for Beginners)

Render is the easiest platform for beginners to deploy Node.js apps.

1. **Create a Render account**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/farm-genie-bot.git
   git push -u origin main
   ```

3. **Connect your GitHub repository**:
   - In Render, click "New +" → "Web Service"
   - Connect your GitHub repository

4. **Configure the deployment**:
   - **Name**: `farm-genie-bot` (or whatever you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan if needed)

5. **Add environment variables**:
   - In the "Environment" section, add these variables:
     - `TELEGRAM_BOT_TOKEN` = your bot token
     - `SUPABASE_URL` = your Supabase URL
     - `SUPABASE_ANON_KEY` = your Supabase anon key
     - `NODE_ENV` = `production`

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for the deployment to complete (usually 2-3 minutes)

7. **Set up the webhook**:
   - Once deployed, go to your bot's URL: `https://your-app-name.onrender.com/test-webhook`
   - This will show you the webhook status
   - Your bot should now be running in webhook mode!

### Step 6: Verify Everything Works

1. **Test your deployed bot**:
   - Send `/start` to your bot on Telegram
   - Try `/status` to see if it connects to Supabase
   - Check that user data is being saved

2. **Monitor your bot**:
   - Check the logs in your Render dashboard
   - Visit the health endpoint: `https://your-app-name.onrender.com/health`

3. **Check your Supabase dashboard**:
   - Go to your Supabase project
   - Navigate to Table Editor → profiles
   - You should see bot users with `telegram_id` filled in!

## 🔗 Integration with Your Web App

### Shared Database Benefits

- **Unified User Management**: Users from both your bot and web app are stored in the same `profiles` table
- **Complete Data Consistency**: No duplicate user records or data synchronization needed
- **Seamless User Experience**: Existing web app users can immediately use the bot
- **Single Source of Truth**: All user data in one place
- **Easy Management**: Manage everything from your existing Supabase dashboard

### Database Schema Integration

The bot adds these fields to your existing `profiles` table:

```sql
-- New bot-specific columns added to profiles table
telegram_id VARCHAR(255) UNIQUE,           -- Links Telegram user to profile
last_bot_activity TIMESTAMP WITH TIME ZONE, -- When user last used bot
is_bot_active BOOLEAN DEFAULT TRUE,        -- Whether user has active bot access
bot_registered_at TIMESTAMP WITH TIME ZONE  -- When user first used bot
```

### How It Works

1. **New bot user**: Creates a new profile with `telegram_id` and bot fields
2. **Existing web app user**: Can link their Telegram account to their existing profile
3. **Unified data**: All user information stays in one place
4. **Cross-platform**: Users can access both web app and bot seamlessly

### Web App Integration Ideas

You can extend this setup to:
- Show bot users in your web app dashboard
- Allow users to link/unlink their Telegram account
- Sync preferences between web app and bot
- Create unified analytics and reporting
- Add bot configuration through web app
- Show bot activity in user profiles

## 🚨 Troubleshooting

### Common Issues:

1. **"TELEGRAM_BOT_TOKEN is required"**
   - Make sure your `.env` file exists and has the correct bot token
   - Check that the token doesn't have extra spaces

2. **"Missing Supabase environment variables"**
   - Verify your Supabase URL and anon key are correct
   - Make sure you copied the "anon public" key, not the service role key
   - Double-check that you're using your existing Supabase project credentials

3. **Bot doesn't respond**
   - Check that your bot token is correct
   - Make sure you've started a chat with your bot in Telegram
   - Check the console logs for errors

4. **Database connection errors**
   - Verify your Supabase project is active
   - Check that you ran the SQL setup script (`supabase-setup-profiles.sql`)
   - Ensure your anon key has the correct permissions

5. **Bot columns don't exist**
   - Make sure you ran `supabase-setup-profiles.sql` in your SQL Editor
   - Check that the SQL executed successfully
   - Verify the columns were added to your profiles table

6. **Webhook not working**
   - Make sure your Render URL is accessible
   - Check that the webhook URL is set correctly
   - Verify your bot token is valid

### Getting Help:

- Check the console logs for error messages
- Verify all environment variables are set correctly
- Make sure your Supabase database is properly set up
- Test locally before deploying
- Check Render logs for deployment issues
- Run `node test-supabase.js` to test your connection

## 📁 Project Structure

```
farm-genie-first-bot/
├── src/
│   ├── bot/
│   │   └── handlers/
│   │       └── commandHandler.ts    # Bot command logic
│   ├── lib/
│   │   └── supabase.ts             # Database connection & operations
│   └── server.ts                   # Main server file
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── .env                           # Your environment variables (create this)
├── env.example                    # Example environment file
├── supabase-setup-profiles.sql   # Database setup for profiles table
├── test-supabase.js              # Connection test script
└── README.md                      # This file
```

## 🤖 Available Commands

- `/start` - Welcome message and user registration
- `/help` - Show available commands
- `/status` - Show bot statistics and user info

## 🛠️ Development

- **Local development**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production**: `npm start`
- **Watch mode**: `npm run watch`
- **Test connection**: `node test-supabase.js`

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your bot token and Supabase keys secure
- The bot uses Supabase's anon key for database access
- Consider implementing additional security measures for production use

## 🚀 Next Steps

Once your bot is working, you can:

### Immediate Enhancements:
- Add more commands and features
- Implement weather APIs for farming tips
- Add crop management reminders
- Integrate with market price APIs
- Add user preferences and settings

### Web App Integration:
- Create a dashboard to view bot users
- Add user management features
- Implement analytics and reporting
- Create unified user experience
- Add bot configuration through web app
- Allow users to link/unlink Telegram accounts

### Advanced Features:
- Implement AI-powered farming advice
- Add image recognition for plant diseases
- Create community features
- Integrate with IoT sensors
- Add multilingual support
- Sync user preferences between web app and bot

Happy coding! 🌱🤖 