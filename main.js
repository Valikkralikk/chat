const express = require("express");
const { bot } = require("./services/telegramBot");
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    bot.initBot();
    setInterval(() => {
        console.log('Dont sleep', + new Date());
    }, 1000)
});
