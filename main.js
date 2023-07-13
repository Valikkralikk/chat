const express = require("express");
const { botStart } = require("./services/telegramBot");
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    setInterval(()=>{
        console.log('dont sleep')
    },1000);
    botStart();
});
