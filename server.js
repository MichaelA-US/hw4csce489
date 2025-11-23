const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*", // Allow connection from your Netlify frontend
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("SecureCord Relay is Active.");
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("public-key", (data) => {
    socket.broadcast.emit("public-key", data);
  });

  socket.on("secure-message", (data) => {
    socket.broadcast.emit("secure-message", data);
  });
});

// CRITICAL: Use process.env.PORT for Render
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
