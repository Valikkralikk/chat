const express = require("express");
const { bot } = require("./services/telegramBot");
const app = express();
const port = 3000;

function timer(time) {
    setTimeout(() => {
        console.log(time);
        timer(Math.round(Math.random() * 120000));
    }, time);
}

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    bot.initBot();
    timer(60000);
});
