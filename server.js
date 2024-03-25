// const exp = require("constants");
// const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
// const { Socket } = require("net");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("icecandidate", (candidate) => {
    socket.broadcast.emit("icecandidate", candidate);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on the port ", PORT);
});
