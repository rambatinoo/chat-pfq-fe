import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { addCategory } from "./ML-mock.mjs";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      `http://localhost:8081`,
      "http://localhost:5173",
      "http://localhost:6969",
    ],
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: [
      `http://localhost:8081`,
      "http://localhost:5173",
      "http://localhost:6969",
    ],
    methods: ["GET", "POST"],
  })
);

const users = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("register", (username) => {
    users[socket.id] = username;
    socket.join(username);
    console.log(`${username} joined room: ${username}`);
  });

  socket.on("send-customer-message", async (msg) => {
    const messageData = {
      body: msg.body,
      from: msg.from,
      to: "admin",
      created_at: new Date().toLocaleTimeString(),
      category: null,
      sentiment: null,
      is_closed: false,
      table: msg.tableNum,
      sender: msg.sender,
    };

    const categorisedMessage = await addCategory(msg); // mock machine learning function, we can assume that here it would be categorised and sent to the db
    socket.emit("receive-message", categorisedMessage);

    io.to("admin").emit("receive-message", categorisedMessage);
  });

  socket.on("send-admin-message", async (msg) => {
    const messageData = {
      body: msg.body,
      from: "admin",
      to: msg.replyingTo,
      created_at: new Date().toLocaleTimeString(),
      category: null,
      sentiment: null,
      is_closed: false,
      table: msg.tableNum,
      sender: false,
    };

    io.emit("receive-message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
    delete users[socket.id];
  });
});

server.listen(6969, () => {
  console.log("Listening on port: 6969");
});
