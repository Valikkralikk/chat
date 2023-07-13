"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.userRouter = router;
router.use((req, res, next) => {
    next();
});
router.get('/login', (req, res) => {
    res.send('login');
});
router.get('/register', (req, res) => {
    res.send('register');
});
router.post('/login', (req, res) => {
    res.send('login');
});
router.post('/register', (req, res) => {
    res.send('register');
});
