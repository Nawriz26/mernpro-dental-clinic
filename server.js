import { connectDB } from "./config/db.js";
// import "dotenv/config.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.log("ENV loaded. PORT=", process.env.PORT, "MONGO_URI set?", !!process.env.MONGO_URI);



const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("MERNPro Dental API is running"));

const PORT = process.env.PORT || 4000;
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not set. Check your .env file location and keys.");
  process.exit(1);
}

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});
