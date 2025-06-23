require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const authRoutes = require("./routes/auth");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

// ✅ Enable Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Change to frontend URL in production
    methods: ["GET", "POST"]
  }
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Insta Chat Server is Running!");
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Socket.IO message handling
io.on("connection", async (socket) => {
  console.log("🟢 New user connected");

  try {
    const history = await Message.find().sort({ createdAt: 1 }).limit(100);
    socket.emit("chatHistory", history);
  } catch (err) {
    console.error("❌ Failed to fetch chat history:", err);
  }

  socket.on("sendMessage", async (data) => {
    try {
      const newMsg = new Message(data);
      await newMsg.save();
      io.emit("receiveMessage", data);
    } catch (err) {
      console.error("❌ Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

