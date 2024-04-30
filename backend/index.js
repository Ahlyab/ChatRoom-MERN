const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(cors({ origin: "*" }));

// app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", (socket) => {
  socket.on("newuser", (username) => {
    console.log("new user added");
    socket.broadcast.emit("update", username + " joined the conversation");
  });

  socket.on("exituser", (username) => {
    console.log("new user left");

    socket.broadcast.emit("update", username + " left the conversation");
  });

  socket.on("chat", (message) => {
    console.log(`mesage : ${message}`);
    socket.broadcast.emit("chat", message);
  });
});

server.listen(5555, () => {
  console.log("http://localhost:5555");
});
