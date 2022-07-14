const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 9999;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/send", (req, res) => {
  sendDataToFile("data");
  fs.readFile(path.join(__dirname, "data.txt"), (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

let users = [];

io.on("connection", (socket) => {
  socket.userName = socket.handshake.query.name;
  users.push(socket);
  console.log(`${socket.handshake.query.name} connected`);
  socket.on("disconnect", () => {
    users = users.filter((user) => user.id != socket.id);
    console.log(`${socket.handshake.query.name}  disconnected`);
  });
  socket.on("message", (data) => {
    io.sockets.emit("new", { msg: data, name: socket.userName });
  });
});

server.listen(PORT, () => {
  console.log("Server started on heroku " + PORT);
});
