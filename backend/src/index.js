// backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 10000;
const __dirname = path.resolve();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Dynamic CORS (local + production)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://fullstack-chat-app-two-sigma.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is live and running!");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend build in production (optional)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Start server
server.listen(PORT, () => {
  console.log("🚀 Server running on PORT: " + PORT);
  connectDB();
});
