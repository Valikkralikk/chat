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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users/");
const telegramBot_1 = require("./services/telegramBot");
class App {
    constructor(logger) {
        this.app = (0, express_1.default)();
        this.PORT = 8000;
        this.logger = logger;
    }
    useRoutes() {
        this.app.use('/users', users_1.userRouter);
        this.app.get('/', (req, res) => {
            console.log('Hi');
            res.send('Hi');
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useRoutes();
            this.server = this.app.listen(this.PORT, () => {
                (0, telegramBot_1.botStart)();
                this.logger.log(`Server started on ${this.PORT}`);
            });
        });
    }
}
exports.App = App;
;
