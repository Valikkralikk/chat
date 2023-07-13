const TelegramBot = require("node-telegram-bot-api");
const token = '6304468525:AAGGEVpySqbrLjQVFDmQ8ABlXBnGyOmoUbs';
const bot = new TelegramBot(token, { polling: true });
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);
    if (msg.text == 'dog' || msg.text == '🦮') {
        bot.sendMessage(chatId, "You sent 'dog'");
    }
});
const botStart = async () => {
    console.log(`Bot started`);
    return await bot;
};
module.exports = { botStart };
