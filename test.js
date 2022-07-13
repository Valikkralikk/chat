const https = require("http");

https.get("http://chat-theater.herokuapp.com/send", (res) => {
  res.setEncoding("utf8");
  res.on("data", (c) => {
    console.log(c);
  });
});
