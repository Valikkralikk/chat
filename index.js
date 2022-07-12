const http = require("http");
const socket = require("socket.io");
const express = require("express");
const app = express();

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Connect");
});

server.listen(9999, () => {
  console.log("Server started");
});
