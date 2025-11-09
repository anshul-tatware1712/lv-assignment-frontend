import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express({
  origin: "*",
});

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Startlyz backend running ✅");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
