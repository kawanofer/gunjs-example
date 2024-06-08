require("dotenv").config();
const express = require("express");
const Gun = require("gun");
const http = require("http");

const app = express();
const port = process.env.PORT || 8765;

app.use(Gun.serve);

// Create an HTTP server
const server = http.createServer(app);

// Add error handling for the HTTP server
server.on("error", (err) => {
  console.error("# HTTP SERVER - error:", err);
});

// Add WebSocket error handling during upgrade
server.on("upgrade", (request, socket, head) => {
  socket.on("error", (err) => {
    console.error("# UPGRADE - WebSocket error during upgrade:", err);
  });
});

// Add WebSocket connection and disconnection logging
server.on("connection", (socket) => {
  console.log("# CONNECTION - WebSocket connected:", socket.remoteAddress);

  socket.on("close", (code, reason) => {
    console.log(
      "# CONNECTION - WebSocket disconnected:",
      socket.remoteAddress,
      "Code:",
      code,
      "Reason:",
      reason
    );
  });

  socket.on("error", (err) => {
    console.error("# CONNECTION - WebSocket error:", err);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Gun server running on http://localhost:${port}`);
});

// Initialize Gun.js
const gun = Gun({
  file: "data", // Enable file storage for simplicity
  web: server
});

// Handle Gun.js events
gun.on("hi", (peer) => {
  console.log("# GUN HI - Peer connected:", peer);
});

gun.on("bye", (peer, reason) => {
  console.log("# GUN BYE - Peer disconnected:", peer, "Reason:", reason);
});

// Add error handling for Gun.js connections
gun.on("in", (msg) => {
  if (msg.err) {
    console.error("# GUN IN - Incoming message error:", msg.err);
  }
});

gun.on("out", (msg) => {
  if (msg.err) {
    console.error("# GUN OUT - Outgoing message error:", msg.err);
  }
});

// Capture unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("# UNHANDLED REJECTION - at:", promise, "reason:", reason);
});

// Capture uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("# UNCAUGHT EXCEPTION - thrown:", err);
  process.exit(1); // Optional: exit the process to avoid unknown state
});

// Ensure clean shutdown
process.on("SIGTERM", () => {
  console.log("# SIGNAL - SIGTERM received: closing HTTP server");
  server.close(() => {
    console.log("# HTTP SERVER - closed");
  });
});

process.on("SIGINT", () => {
  console.log("# SIGNAL - SIGINT received: closing HTTP server");
  server.close(() => {
    console.log("# HTTP SERVER - closed");
  });
});
