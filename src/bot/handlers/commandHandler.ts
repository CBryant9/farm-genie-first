import TelegramBot from 'node-telegram-bot-api';
import { UserService } from '../../lib/supabase';

export class CommandHandler {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.setupCommands();
  }

  private setupCommands(): void {
    // Handle /start command
    this.bot.onText(/\/start/, this.handleStart.bind(this));

    // Handle /help command
    this.bot.onText(/\/help/, this.handleHelp.bind(this));

    // Handle /status command
    this.bot.onText(/\/status/, this.handleStatus.bind(this));

    // Handle any other text messages
    this.bot.on('message', this.handleMessage.bind(this));
  }

  private async handleStart(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    const user = msg.from;

    if (!user) {
      await this.bot.sendMessage(chatId, 'Sorry, I could not identify you.');
      return;
    }

    const welcomeMessage = `
🎉 Welcome to Farm Genie Bot!

Hi ${user.first_name || 'there'}! I'm your farming assistant bot.

🌱 **What I can do:**
• Provide farming tips and advice
• Weather updates for your location
• Crop management reminders
• Market price alerts
• Farming best practices

📋 **Available Commands:**
• /start - Show this welcome message
• /help - Show available commands
• /status - Show bot statistics

🔗 **Getting Started:**
To access premium features, please sign up through our web app where you can manage your subscription and preferences.

I'm here to help with your farming journey! 🌾

Your Telegram ID: ${user.id}
    `.trim();

    await this.bot.sendMessage(chatId, welcomeMessage);
  }

  private async handleHelp(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;

    const helpMessage = `
🤖 Farm Genie Bot - Available Commands

/start - Start the bot and get welcome message
/help - Show this help message
/status - Show bot statistics and user info

🌱 **Coming Soon:**
• Weather updates for your location
• Farming tips and advice
• Crop management reminders
• Market price alerts
• Personalized recommendations

🔗 **Premium Features:**
For advanced features and personalized recommendations, please sign up through our web app.

Need help? Contact the bot administrator.
    `.trim();

    await this.bot.sendMessage(chatId, helpMessage);
  }

  private async handleStatus(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    const user = msg.from;

    if (!user) {
      await this.bot.sendMessage(chatId, 'Sorry, I could not identify you.');
      return;
    }

    try {
      // Get overall stats (only if database is accessible)
      const stats = await UserService.getUserStats();

      const statusMessage = `
📊 Bot Status Report

🤖 Bot Statistics:
• Total Bot Users: ${stats.total_users}
• Active Bot Users: ${stats.active_users}
• New Bot Users Today: ${stats.new_users_today}

👤 Your Information:
• Telegram ID: ${user.id}
• Username: ${user.username || 'Not set'}
• Name: ${user.first_name} ${user.last_name || ''}

🌱 **Bot Status:**
• Server: ✅ Running
• Database: ✅ Connected
• Mode: Production

💡 **Note:** Premium features require web app registration.
      `.trim();

      await this.bot.sendMessage(chatId, statusMessage);
    } catch (error) {
      console.error('Error handling status command:', error);
      
      // Fallback message if database is not accessible
      const fallbackMessage = `
📊 Bot Status Report

👤 Your Information:
• Telegram ID: ${user.id}
• Username: ${user.username || 'Not set'}
• Name: ${user.first_name} ${user.last_name || ''}

🌱 **Bot Status:**
• Server: ✅ Running
• Database: ⚠️ Limited access
• Mode: Production

💡 **Note:** Premium features require web app registration.
      `.trim();

      await this.bot.sendMessage(chatId, fallbackMessage);
    }
  }

  private async handleMessage(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Only respond to text messages that aren't commands
    if (text && !text.startsWith('/')) {
      const response = `
💬 Thanks for your message!

I'm still learning and don't understand "${text}" yet.

Try these commands:
• /start - Get started
• /help - See available commands
• /status - Check bot status

🌱 More features are coming soon!

💡 **Premium Features:** For personalized farming advice and advanced features, please sign up through our web app.
      `.trim();

      await this.bot.sendMessage(chatId, response);
    }
  }
} 