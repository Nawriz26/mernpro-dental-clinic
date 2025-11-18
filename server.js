// Load env first
import dotenv from "dotenv";
dotenv.config();

// Core & DB
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Routes & middleware
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Debug (optional; remove later)
console.log("ENV loaded. PORT=", process.env.PORT, "MONGO_URI set?", !!process.env.MONGO_URI);

// App init
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => res.send("MERNPro Dental API is running"));

// Guard for missing DB URI
const PORT = process.env.PORT || 4000;
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not set. Check your .env file location and keys.");
  process.exit(1);
}

// API routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use('/api/appointments', appointmentRoutes);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

// Start server after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    process.exit(1);
  });
