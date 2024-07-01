import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { addCategory } from "./ML-mock.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:8081`,
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: `http://localhost:8081`,
  })
);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("register", (username) => {
    socket.join(`${username}`);
  });
  socket.on("send-customer-message", async (msg) => {
    const messageData = {
      body,
      from: msg.username,
      to: "room",
      created_at: new Date().toLocaleTimeString(),
      category: null,
      sentiment: null,
      is_closed: false,
      table: msg.table,
    };
    socket.emit("receive-message", messageData);
    const categorisedMessage = await addCategory(msg); // mock machine learning function, we can assume that here it would be categorised and sent to the db
    io.to("admin").emit("receive-message", categorisedMessage);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});
server.listen(6969, () => {
  console.log("Listening on port: 6969");
});
