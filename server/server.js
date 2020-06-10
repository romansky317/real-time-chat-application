const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');
const PORT = process.env.port || 4000;

const router = require("./router");

// Setup Socket
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to ${user.room} group`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} has joined the group`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);


    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left the room`,
      });
    }
  });
});

app.use(router);
app.use(cors());
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
