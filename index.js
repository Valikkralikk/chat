const http = require("http");
const fs = require("fs");
const path = require("path");
const socket = require("socket.io");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 9999;

const server = http.createServer(app);

async function sendDataToFile(data) {
  await fs.open(path(__dirname, "data.txt"), "w", (err) => {
    if (err) throw err;
    console.log("File created");
  });

  await fs.appendFile(path(__dirname, "data.txt"), toString(data), (err) => {
    if (err) throw err;
    console.log("Data has been added!");
  });
}

app.get("/", (req, res) => {
  res.send("Connect");
});

app.get("/send", (req, res) => {
  console.log(req);
  sendDataToFile("data");
  fs.readFile(path(__dirname, "data.txt"), (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

server.listen(PORT, () => {
  console.log("Server started on heroku " + PORT);
});
