const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Telegram bot token
const token = '6834075119:AAGK8MOU0AV2coWz61rFwasipeSf2R2NfSI';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to fetch the quote of the day from an API
async function fetchQuote() {
    try {
        const response = await axios.get('YOUR_QUOTE_API_ENDPOINT');
        return response.data.quote;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}

// Function to send the quote to Telegram
async function sendQuote(chatId, quote) {
    try {
        await bot.sendMessage(chatId, quote);
    } catch (error) {
        console.error('Error sending quote:', error);
    }
}

// Schedule the bot to send the quote of the day daily
async function scheduleQuote() {
    // Fetch the chat ID of your Telegram channel or group
    const chatId = 'YOUR_CHAT_ID';

    // Fetch the quote of the day
    const quote = await fetchQuote();

    // Send the quote to Telegram
    if (quote) {
        await sendQuote(chatId, quote);
    }
}

// Run the bot
scheduleQuote();
 