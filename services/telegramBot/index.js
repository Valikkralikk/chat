"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botStart = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const token = '6304468525:AAGGEVpySqbrLjQVFDmQ8ABlXBnGyOmoUbs';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.on('message', (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    if (msg.text == 'dog' || msg.text == '🦮') {
        bot.sendMessage(chatId, "You sent 'dog'");
    }
});
const botStart = () => __awaiter(void 0, void 0, void 0, function* () { return yield bot; });
exports.botStart = botStart;
