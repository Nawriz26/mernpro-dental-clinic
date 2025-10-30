import "dotenv/config.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("MERNPro Dental API is running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
