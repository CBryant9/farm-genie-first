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

    try {
      // Save or update user in database
      const dbUser = await UserService.getOrCreateUser(user.id.toString(), {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      });

      const welcomeMessage = `
🎉 Welcome to Farm Genie Bot!

Hi ${user.first_name || 'there'}! I'm your farming assistant bot.

Here's what I can do:
• /start - Show this welcome message
• /help - Show available commands
• /status - Show bot statistics

I'll help you with farming tips, weather updates, and more!

Your profile ID: ${dbUser.id}
      `.trim();

      await this.bot.sendMessage(chatId, welcomeMessage);
    } catch (error) {
      console.error('Error handling start command:', error);
      await this.bot.sendMessage(chatId, 'Sorry, there was an error processing your request.');
    }
  }

  private async handleHelp(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;

    const helpMessage = `
🤖 Farm Genie Bot - Available Commands

/start - Start the bot and get welcome message
/help - Show this help message
/status - Show bot statistics and user info

More features coming soon:
• Weather updates for your location
• Farming tips and advice
• Crop management reminders
• Market price alerts

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
      // Get user info from database
      const dbUser = await UserService.getUserByTelegramId(user.id.toString());
      
      // Get overall stats
      const stats = await UserService.getUserStats();

      let statusMessage = `
📊 Bot Status Report

🤖 Bot Statistics:
• Total Bot Users: ${stats.total_users}
• Active Bot Users: ${stats.active_users}
• New Bot Users Today: ${stats.new_users_today}

👤 Your Information:
• Telegram ID: ${user.id}
• Username: ${user.username || 'Not set'}
• Name: ${user.first_name} ${user.last_name || ''}
      `.trim();

      if (dbUser) {
        statusMessage += `
📅 Bot Account Details:
• Bot registered: ${dbUser.bot_registered_at ? new Date(dbUser.bot_registered_at).toLocaleDateString() : 'Unknown'}
• Last bot activity: ${dbUser.last_bot_activity ? new Date(dbUser.last_bot_activity).toLocaleDateString() : 'Unknown'}
• Bot status: ${dbUser.is_bot_active ? '🟢 Active' : '🔴 Inactive'}
        `;

        if (dbUser.full_name) {
          statusMessage += `• Full name: ${dbUser.full_name}\n`;
        }
      }

      await this.bot.sendMessage(chatId, statusMessage);
    } catch (error) {
      console.error('Error handling status command:', error);
      await this.bot.sendMessage(chatId, 'Sorry, there was an error getting the status.');
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

More features are coming soon! 🌱
      `.trim();

      await this.bot.sendMessage(chatId, response);
    }
  }
} 