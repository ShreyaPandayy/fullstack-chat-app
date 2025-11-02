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

// Load environment variables
dotenv.config();

// Server port
const PORT = process.env.PORT || 10000;

// Resolve directory path
const __dirname = path.resolve();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Dynamic CORS (local + production)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local development
      "https://fullstack-chat-app-two-sigma.vercel.app", // your Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // allow cookies
  })
);
s

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is live and running!");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend build (optional – if you ever deploy frontend and backend together)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
  connectDB();
});
