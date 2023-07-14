const TelegramBot = require("node-telegram-bot-api");
const { Amway } = require("../amway");
const { Wildberries } = require("../wildberries");
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
                    const productInCash = this.checkProductInCash(msg.text)
                    const wildberriesProduct = await Wildberries.getProductsByQuery(productInCash.name);
                    await this.bot.sendMessage(chatId, productInCash.text);
                    if (wildberriesProduct) {
                        await this.bot.sendMessage(
                            chatId,
                            `Wildberries: ${wildberriesProduct.price}BYN. Ссылка: ${wildberriesProduct.link}`);
                    } else {
                        await this.bot.sendMessage(chatId, `Wildberries: продукт с таким названием не найден`);
                    }
                } else {
                    const url = await this.amway.getProductUrlById(msg.text);
                    const product = await this.amway.getProduct(url);
                    if (product) {
                        const wildberriesProduct = await Wildberries.getProductsByQuery(product.name);
                        this.setProductIntoCash({ name: product.name, text: product.text, id: Number(msg.text), date: new Date() });
                        await this.bot.sendMessage(chatId, product.text);
                        if (wildberriesProduct) {
                            await this.bot.sendMessage(
                                chatId,
                                `Wildberries: ${wildberriesProduct.price}BYN. Ссылка: ${wildberriesProduct.link}`);
                        } else {
                            await this.bot.sendMessage(chatId, `Wildberries: продукт с таким названием не найден`);
                        }
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
