import TelegramBot from 'node-telegram-bot-api';

const token = '6304468525:AAGGEVpySqbrLjQVFDmQ8ABlXBnGyOmoUbs'

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    console.log(msg);
    const chatId = msg.chat.id
    if (msg.text == 'dog' || msg.text == '🦮') {
        bot.sendMessage(chatId, "You sent 'dog'")
    }
});

export const botStart = async () => await bot;