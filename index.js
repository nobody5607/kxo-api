import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { SocketNoty } from "./socket/noty.js";
import { SocketChat } from "./socket/chat.js";
import { connectDatabase } from "./config/MongoDb.js";
dotenv.config();
connectDatabase(); //connection db
const server = http.createServer(app);
app.use(cors());
const PORT = process.env.APP_PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
//socket io
io.on("connection", (socket) => {
  SocketNoty(socket);
  SocketChat(socket);
  //disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(PORT, () => console.log(`Start ... http://localhost:${PORT}`));
