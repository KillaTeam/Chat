const { Server } = require("socket.io");
const socketMiddleware = require("./middleware/socket-middleware");
const authMiddleware = require("./middleware/auth-middleware");
const chatService = require("./service/chatService");
const userService = require("./service/userService");
const UserDto = require("./dtos/uset-dto");

module.exports = function ws(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  // socketMiddleware(io)
  io.on("error", (err) => console.log(err));

  io.on("connection", (socket) => {
    socket.on("message", async (data) => {
      const toId = await chatService.getSocketIdByName(data.to);
      const from = await chatService.getUserByEmail(data.name);
      const chat = await chatService.addMessage(data);
      io.to(socket.id).emit("GetPrivateRoom", { room: chat, to: data.to });
      io.to(toId).emit("GetPrivateRoom", { room: chat, from: from.name });
    });
    socket.on("newUser", async (data) => {
      try {
        if (!data.userName) {
          return io.to(socket.id).emit("error", "noName");
        }
        socket.email = data.userName;
        const user = await chatService.getUserByEmail(socket.email);
        if (user.isOnline) {
          socket.id == user.socketId;
        }
        await userService.setStatusActivity(true, socket.email, socket.id);
        const users = await chatService.getAllOnlineUsers();
        console.log(`⚡: User just connected, ID: ${socket.id}`);
        io.emit("newUserResponse", users);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponce", data)
    );

    socket.on("disconnect", async () => {
      try {
        const user = await chatService.getUserBySocketId(`${socket.id}`);
        await userService.setStatusActivity(false, user.email);
        const users = await chatService.getAllOnlineUsers();
        io.emit("newUserResponse", users);
        console.log(`🔥: ${socket.id} a user disconnect`);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("privateRoom", async (data) => {
      const chat = await chatService.createPrivateRoom(data.email, data.to);
      // console.log(chat);
      io.to(socket.id).emit("GetPrivateRoom", { room: chat });
    });
  });
};
