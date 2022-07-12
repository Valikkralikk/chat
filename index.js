const http = require("http");
const socket = require("socket.io");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 9999;

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Connect");
});

app.get("/send", (req, res) => {
  res.send("NewConnect");
});

server.listen(PORT, () => {
  console.log("Server started on heroku " + PORT);
});
