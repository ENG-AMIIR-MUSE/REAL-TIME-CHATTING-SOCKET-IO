import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["post", "get"],
  },
});
let userSocketMap = {};

export const getReceiverId = (id) => {
  return userSocketMap[id];
};
io.on("connection", (socket) => {
  const userid = socket.handshake.query.userId;

  if (userid != undefined) {
    userSocketMap[userid] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }
  socket.on("typing", (typingEvent) => {
    console.log("Listing.. Typing Event..", typingEvent);
    const { senderId, receiverId } = typingEvent;
    if (receiverId != undefined) {
      const receiverSocketId = getReceiverId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("displayingTyping", {receiverId,senderId,message:"Typing..."});
      }
    }
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userid];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, server, io };
