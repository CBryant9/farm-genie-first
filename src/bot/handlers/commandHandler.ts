import TelegramBot from 'node-telegram-bot-api';
import { UserService } from '../../lib/supabase';
import { stateManager } from '../../lib/stateManager';
import { subscriptionCache } from '../../lib/subscriptionCache';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Configuration
const APP_URL = process.env.APP_URL || 'https://your-app-url.com';

// Smart start command with email verification
export async function handleStart(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id;
  const firstName = msg.from?.first_name || 'User';

  if (!telegramId) {
    await bot.sendMessage(chatId, '❌ Unable to identify your Telegram account.');
    return;
  }

  try {
    // Check if user already exists in database
    const existingUser = await UserService.getUserByTelegramId(telegramId);

    if (existingUser) {
      // User already linked - welcome back
      await handleWelcomeBack(bot, chatId, firstName, existingUser);
    } else {
      // New user - start email verification flow
      await handleNewUser(bot, chatId, firstName, telegramId);
    }
  } catch (error) {
    console.log('❌ Error in handleStart:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your request. Please try again.');
  }
}

// Handle returning user
async function handleWelcomeBack(
  bot: TelegramBot, 
  chatId: number, 
  firstName: string, 
  user: any
): Promise<void> {
  try {
    // Update bot activity
    await UserService.updateBotActivity(parseInt(user.telegram_id));

    // Get subscription status from cache
    const subscriptionResult = await subscriptionCache.getSubscriptionStatus(parseInt(user.telegram_id));
    
    let welcomeMessage = `🎉 Welcome back, ${firstName}! 👋\n\n`;
    
    if (subscriptionResult.subscriptionStatus === 'active') {
      welcomeMessage += `✅ Your subscription is active\n`;
      welcomeMessage += `🌱 You have full access to all bot features\n\n`;
      welcomeMessage += `Available commands:\n`;
      welcomeMessage += `• /help - Show all commands\n`;
      welcomeMessage += `• /status - Check your subscription status\n`;
      welcomeMessage += `• /profile - View your profile info`;
    } else {
      welcomeMessage += `⚠️ Your subscription is ${subscriptionResult.subscriptionStatus || 'inactive'}\n`;
      welcomeMessage += `🔗 Visit our website to activate your subscription\n\n`;
      welcomeMessage += `Available commands:\n`;
      welcomeMessage += `• /help - Show all commands\n`;
      welcomeMessage += `• /status - Check your subscription status`;
    }

    await bot.sendMessage(chatId, welcomeMessage);
  } catch (error) {
    console.error('❌ Error in handleWelcomeBack:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your request. Please try again.');
  }
}

// Handle new user
async function handleNewUser(
  bot: TelegramBot, 
  chatId: number, 
  firstName: string, 
  telegramId: number
): Promise<void> {
  const welcomeMessage = `👋 Welcome, ${firstName}! 🌱\n\n` +
    `I'm your Farm Genie bot assistant. To get started, I need to link your Telegram account to your existing profile.\n\n` +
    `📧 Please enter the email address associated with your account:`;

  // Set user state to awaiting email
  stateManager.setState(telegramId, 'awaiting_email');

  await bot.sendMessage(chatId, welcomeMessage);
}

// Main message handler with authentication and subscription checking
export async function handleMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id;
  const text = msg.text;

  if (!telegramId || !text) {
    console.log('❌ Missing telegramId or text in message');
    return;
  }

  // Skip if it's a command
  if (text.startsWith('/')) {
    console.log(`📝 Command received: ${text} from user ${telegramId}`);
    return;
  }

  try {
    console.log(`📨 Processing message from user ${telegramId}: "${text}"`);

    // Flow: Check auth → Check state → Check subscription → Process message
    
    // Step 1: Check authentication
    const authResult = await checkAuthentication(telegramId);
    if (!authResult.isAuthenticated) {
      console.log(`🔐 User ${telegramId} not authenticated, prompting to use /start`);
      await bot.sendMessage(chatId, 
        '🔐 Please use /start to link your Telegram account to your profile first.'
      );
      return;
    }

    // Step 2: Check conversation state
    const userState = stateManager.getState(telegramId);
    if (userState?.state === 'awaiting_email') {
      console.log(`📧 User ${telegramId} in awaiting_email state, processing email verification`);
      await handleEmailVerification(bot, chatId, telegramId, text);
      return;
    }

    // Step 3: Check subscription status
    const subscriptionResult = await checkSubscriptionStatus(telegramId);
    if (!subscriptionResult.isActive) {
      console.log(`⚠️ User ${telegramId} subscription not active: ${subscriptionResult.status}`);
      await handleInactiveSubscription(bot, chatId, subscriptionResult.status);
      return;
    }

    // Step 4: Process message normally (user is authenticated and has active subscription)
    console.log(`✅ User ${telegramId} authenticated and active, processing message normally`);
    await processAuthenticatedMessage(bot, chatId, telegramId, text, authResult.user);

  } catch (error) {
    console.error('❌ Error in main message handler:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your message. Please try again.');
  }
}

// Check if user is authenticated
async function checkAuthentication(telegramId: number): Promise<{
  isAuthenticated: boolean;
  user?: any;
}> {
  try {
    const user = await UserService.getUserByTelegramId(telegramId);
    return {
      isAuthenticated: !!user,
      user
    };
  } catch (error) {
    console.error('❌ Error checking authentication:', error);
    return { isAuthenticated: false };
  }
}

// Check subscription status
async function checkSubscriptionStatus(telegramId: number): Promise<{
  isActive: boolean;
  status: 'active' | 'inactive' | 'cancelled' | null;
  fromCache: boolean;
}> {
  try {
    const result = await subscriptionCache.getSubscriptionStatus(telegramId);
    return {
      isActive: result.subscriptionStatus === 'active',
      status: result.subscriptionStatus,
      fromCache: result.fromCache
    };
  } catch (error) {
    console.error('❌ Error checking subscription status:', error);
    return {
      isActive: false,
      status: null,
      fromCache: false
    };
  }
}

// Handle inactive subscription messages
async function handleInactiveSubscription(
  bot: TelegramBot, 
  chatId: number, 
  status: 'active' | 'inactive' | 'cancelled' | null
): Promise<void> {
  let message = '';

  switch (status) {
    case 'inactive':
      message = `⚠️ Your subscription is inactive.\n\n` +
        `Please update your payment method to continue using all bot features.\n\n` +
        `🔗 Update payment: ${APP_URL}/billing\n\n` +
        `Use /status to check your current subscription status.`;
      break;
    
    case 'cancelled':
      message = `❌ Your subscription has been cancelled.\n\n` +
        `You can reactivate your subscription anytime to regain access to all features.\n\n` +
        `🔗 Reactivate: ${APP_URL}/subscribe\n\n` +
        `Use /status to check your current subscription status.`;
      break;
    
    default:
      message = `⚠️ Your subscription status is not set.\n\n` +
        `Please set up your subscription to access all bot features.\n\n` +
        `🔗 Subscribe: ${APP_URL}/subscribe\n\n` +
        `Use /status to check your current subscription status.`;
      break;
  }

  await bot.sendMessage(chatId, message);
}

// Process message for authenticated users with active subscriptions
async function processAuthenticatedMessage(
  bot: TelegramBot, 
  chatId: number, 
  telegramId: number, 
  text: string, 
  user: any
): Promise<void> {
  try {
    // Update bot activity
    await UserService.updateBotActivity(telegramId);

    // Handle farming-related queries (placeholder for future features)
    const response = `🌱 Thanks for your message: "${text}"\n\n` +
      `This is a placeholder for future farming features. Your subscription is active, so you'll have access to all upcoming features!\n\n` +
      `Use /help to see available commands.`;

    await bot.sendMessage(chatId, response);
  } catch (error) {
    console.error('❌ Error processing authenticated message:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your message. Please try again.');
  }
}

// Handle email verification
async function handleEmailVerification(
  bot: TelegramBot, 
  chatId: number, 
  telegramId: number, 
  email: string
): Promise<void> {
  try {
    console.log(`📧 Processing email verification for user ${telegramId}: ${email}`);

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      await bot.sendMessage(chatId, 
        '❌ Please enter a valid email address (e.g., user@example.com)'
      );
      return;
    }

    // Try to link Telegram to existing profile
    const linkedProfile = await UserService.linkTelegramToProfile(telegramId, email);

    if (linkedProfile) {
      // Successfully linked - invalidate cache for this user
      subscriptionCache.invalidate(telegramId);
      
      // Clear state
      stateManager.clearState(telegramId);
      
      console.log(`✅ Successfully linked Telegram account for user ${telegramId}`);
      
             const successMessage = `✅ Successfully linked your Telegram account!\n\n` +
         `Welcome to Farm Genie, ${linkedProfile.full_name || linkedProfile.name || 'User'}! 🌱\n\n` +
         `Your account is now connected and ready to use.\n\n` +
         `Available commands:\n` +
         `• /help - Show all commands\n` +
         `• /status - Check your subscription status\n` +
         `• /profile - View your profile info`;

      await bot.sendMessage(chatId, successMessage);
    } else {
      // Email not found in database
      console.log(`❌ Email not found in database for user ${telegramId}: ${email}`);
      await bot.sendMessage(chatId, 
        '❌ Email not found in our database. Please make sure you\'re using the same email address you used to sign up on our website.\n\n' +
        'If you haven\'t created an account yet, please visit our website first.'
      );
    }
  } catch (error) {
    console.error('❌ Error in email verification:', error);
    await bot.sendMessage(chatId, 
      '❌ Sorry, there was an error linking your account. Please try again or contact support.'
    );
  }
}

// Help command
export async function handleHelp(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id;

  if (!telegramId) {
    await bot.sendMessage(chatId, '❌ Unable to identify your Telegram account.');
    return;
  }

  try {
    const existingUser = await UserService.getUserByTelegramId(telegramId);
    const subscriptionResult = await subscriptionCache.getSubscriptionStatus(telegramId);

    let helpMessage = `🤖 Farm Genie Bot Commands\n\n`;

    if (existingUser) {
      helpMessage += `📋 Available Commands:\n`;
      helpMessage += `• /start - Restart the bot\n`;
      helpMessage += `• /help - Show this help message\n`;
      helpMessage += `• /status - Check your subscription status\n`;
      helpMessage += `• /profile - View your profile info\n\n`;

      if (subscriptionResult.subscriptionStatus === 'active') {
        helpMessage += `✅ Your subscription is active - you have access to all features!\n`;
        helpMessage += `🌱 You can ask me farming questions and get personalized advice.`;
      } else {
        helpMessage += `⚠️ Your subscription is ${subscriptionResult.subscriptionStatus || 'inactive'}\n`;
        helpMessage += `🔗 Visit our website to activate your subscription for full access.`;
      }
    } else {
      helpMessage += `🔐 Please use /start to link your Telegram account to your profile first.\n\n`;
      helpMessage += `Once linked, you'll have access to all bot features based on your subscription status.`;
    }

    await bot.sendMessage(chatId, helpMessage);
  } catch (error) {
    console.log('❌ Error in handleHelp:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your request. Please try again.');
  }
}

// Status command
export async function handleStatus(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id;

  if (!telegramId) {
    await bot.sendMessage(chatId, '❌ Unable to identify your Telegram account.');
    return;
  }

  try {
    if (!UserService.isAvailable()) {
      await bot.sendMessage(chatId, '❌ Database connection not available. Please try again later.');
      return;
    }

    const existingUser = await UserService.getUserByTelegramId(telegramId);
    
    if (!existingUser) {
      await bot.sendMessage(chatId, 
        '🔐 Your Telegram account is not linked to a profile.\n\n' +
        'Use /start to link your account to your existing profile.'
      );
      return;
    }

    // Get subscription status from cache
    const subscriptionResult = await subscriptionCache.getSubscriptionStatus(telegramId);
    
    let statusMessage = `📊 Your Account Status\n\n`;
         statusMessage += `👤 Profile: ${existingUser.full_name || existingUser.name || 'Not set'}\n`;
    statusMessage += `📧 Email: ${existingUser.email || 'Not set'}\n`;
    statusMessage += `🤖 Bot Status: ✅ Active\n`;
    statusMessage += `📅 Last Activity: ${existingUser.last_bot_activity ? new Date(existingUser.last_bot_activity).toLocaleDateString() : 'Never'}\n\n`;

    if (subscriptionResult.subscriptionStatus) {
      statusMessage += `💳 Subscription Status: ${subscriptionResult.subscriptionStatus.toUpperCase()}\n`;
      
      if (subscriptionResult.subscriptionStatus === 'active') {
        statusMessage += `✅ You have full access to all bot features!\n`;
      } else if (subscriptionResult.subscriptionStatus === 'inactive') {
        statusMessage += `⚠️ Your subscription is inactive\n`;
        statusMessage += `🔗 Update payment: ${APP_URL}/billing`;
      } else if (subscriptionResult.subscriptionStatus === 'cancelled') {
        statusMessage += `❌ Your subscription has been cancelled\n`;
        statusMessage += `🔗 Reactivate: ${APP_URL}/subscribe`;
      }
    } else {
      statusMessage += `💳 Subscription Status: Not set\n`;
      statusMessage += `🔗 Subscribe: ${APP_URL}/subscribe`;
    }

    await bot.sendMessage(chatId, statusMessage);
  } catch (error) {
    console.log('❌ Error in handleStatus:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your request. Please try again.');
  }
}

// Profile command
export async function handleProfile(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id;

  if (!telegramId) {
    await bot.sendMessage(chatId, '❌ Unable to identify your Telegram account.');
    return;
  }

  try {
    const existingUser = await UserService.getUserByTelegramId(telegramId);
    
    if (!existingUser) {
      await bot.sendMessage(chatId, 
        '🔐 Your Telegram account is not linked to a profile.\n\n' +
        'Use /start to link your account to your existing profile.'
      );
      return;
    }

    // Get subscription status from cache
    const subscriptionResult = await subscriptionCache.getSubscriptionStatus(telegramId);

    let profileMessage = `👤 Your Profile\n\n`;
    profileMessage += `🆔 User ID: ${existingUser.id}\n`;
    profileMessage += `📧 Email: ${existingUser.email || 'Not set'}\n`;
         profileMessage += `👨‍💼 Name: ${existingUser.full_name || existingUser.name || 'Not set'}\n`;
    profileMessage += `📅 Created: ${existingUser.created_at ? new Date(existingUser.created_at).toLocaleDateString() : 'Unknown'}\n`;
    profileMessage += `🔄 Updated: ${existingUser.updated_at ? new Date(existingUser.updated_at).toLocaleDateString() : 'Unknown'}\n\n`;
    
    profileMessage += `🤖 Bot Information:\n`;
    profileMessage += `• Telegram ID: ${existingUser.telegram_id}\n`;
    profileMessage += `• Bot Active: ${existingUser.is_bot_active ? '✅ Yes' : '❌ No'}\n`;
    profileMessage += `• Bot Registered: ${existingUser.bot_registered_at ? new Date(existingUser.bot_registered_at).toLocaleDateString() : 'Not set'}\n`;
    profileMessage += `• Last Activity: ${existingUser.last_bot_activity ? new Date(existingUser.last_bot_activity).toLocaleDateString() : 'Never'}\n\n`;

    if (subscriptionResult.subscriptionStatus || subscriptionResult.stripeCustomerId || subscriptionResult.subscriptionId) {
      profileMessage += `💳 Subscription Information:\n`;
      profileMessage += `• Customer ID: ${subscriptionResult.stripeCustomerId || 'Not set'}\n`;
      profileMessage += `• Subscription ID: ${subscriptionResult.subscriptionId || 'Not set'}\n`;
      profileMessage += `• Status: ${subscriptionResult.subscriptionStatus || 'Not set'}`;
    }

    await bot.sendMessage(chatId, profileMessage);
  } catch (error) {
    console.log('❌ Error in handleProfile:', error);
    await bot.sendMessage(chatId, '❌ Sorry, there was an error processing your request. Please try again.');
  }
} 