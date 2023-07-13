const TelegramBot = require("node-telegram-bot-api");
const { Amway } = require("../amway");
const token = '6304468525:AAGGEVpySqbrLjQVFDmQ8ABlXBnGyOmoUbs';

class Bot {
    cash = [];

    constructor(token) {
        this.token = token;
        this.amway = new Amway();
    };

    setProductIntoCash(product) {
        this.cash.push(product);
        this.cash.sort((a, b) => a.id - b.id);
    }

    checkProductInCash(id) {
        return this.cash.find(item => item.id === Number(id))
    }

    initBot = async () => {
        this.bot = new TelegramBot(this.token, { polling: true });

        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            if (Number(msg.text)) {
                if (this.checkProductInCash(msg.text)) {
                    await this.bot.sendMessage(chatId, this.checkProductInCash(msg.text).text);
                } else {
                    const url = await this.amway.getProductUrlById(msg.text);
                    const product = await this.amway.getProduct(url);
                    if (product) {
                        this.setProductIntoCash({ text: product, id: Number(msg.text), date: new Date() });
                        await this.bot.sendMessage(chatId, product)
                    } else {
                        await this.bot.sendMessage(chatId, "Product not found");
                    }
                }
            } else {
                await this.bot.sendMessage(chatId, "Send number");
            }
        });

        console.log(`Bot started`);
    };
}

module.exports = { bot: new Bot(token) };
