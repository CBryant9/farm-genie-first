import TelegramBot from 'node-telegram-bot-api';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { CommandHandler } from './bot/handlers/commandHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get bot token from environment
const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  console.error('❌ TELEGRAM_BOT_TOKEN is required in environment variables');
  process.exit(1);
}

// Create bot instance
let bot: TelegramBot;

// Check if we should use webhooks (production) or polling (development)
const isProduction = process.env.NODE_ENV === 'production';
const webhookUrl = process.env.WEBHOOK_URL;

if (isProduction && webhookUrl) {
  // Webhook mode for production
  console.log('🚀 Starting bot in webhook mode...');
  
  bot = new TelegramBot(botToken, {
    webHook: {
      port: Number(PORT)
    }
  });

  // Set webhook URL
  const webhookPath = '/webhook';
  const fullWebhookUrl = `${webhookUrl}${webhookPath}`;
  
  bot.setWebHook(fullWebhookUrl).then(() => {
    console.log(`✅ Webhook set to: ${fullWebhookUrl}`);
  }).catch((error: any) => {
    console.error('❌ Failed to set webhook:', error);
  });

  // Webhook endpoint
  app.post(webhookPath, (req: Request, res: Response) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      mode: 'webhook',
      webhook_url: fullWebhookUrl
    });
  });

  // Test webhook endpoint (bonus feature)
  app.get('/test-webhook', async (req: Request, res: Response) => {
    try {
      const webhookInfo = await bot.getWebhookInfo();
      res.json({
        status: 'ok',
        webhook_info: webhookInfo,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to get webhook info',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

} else {
  // Polling mode for development
  console.log('🔄 Starting bot in polling mode...');
  
  bot = new TelegramBot(botToken, { polling: true });

  // Health check endpoint for polling mode
  app.get('/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      mode: 'polling'
    });
  });
}

// Initialize command handler
const commandHandler = new CommandHandler(bot);

// Bot event handlers
bot.on('polling_error', (error: any) => {
  console.error('❌ Polling error:', error);
});

bot.on('webhook_error', (error: any) => {
  console.error('❌ Webhook error:', error);
});

bot.on('error', (error: any) => {
  console.error('❌ Bot error:', error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/health`);
  
  if (isProduction && webhookUrl) {
    console.log(`🔗 Webhook endpoint: ${webhookUrl}/webhook`);
    console.log(`🧪 Test webhook info: ${webhookUrl}/test-webhook`);
  } else {
    console.log('🔄 Bot is running in polling mode (development)');
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  
  if (bot) {
    if (isProduction && webhookUrl) {
      await bot.deleteWebHook();
      console.log('✅ Webhook deleted');
    } else {
      bot.stopPolling();
      console.log('✅ Polling stopped');
    }
  }
  
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  
  if (bot) {
    if (isProduction && webhookUrl) {
      await bot.deleteWebHook();
    } else {
      bot.stopPolling();
    }
  }
  
  process.exit(0);
}); 