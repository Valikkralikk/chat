const express = require("express");
const { bot } = require("./services/telegramBot");
const { default: axios } = require("axios");
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const response = await axios('https://dont-sleep.onrender.com');
    console.log(response.data);
    return res.send('Im not sleep')
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    bot.initBot();
});
