import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
