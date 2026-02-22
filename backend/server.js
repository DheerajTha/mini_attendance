import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const port = process.env.PORT
const app = express()
app.use(express.json())

app.use(cors({
  origin: true,
}));
mongoose.connect(process.env.MONGO_URI,{
  tls: true,
  retryWrites: true,
  w: "majority"
} )
.then(() => console.log("mongoDb Connect Success") )
.catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("SERVER WORKING WIH NODEMON");
});

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);

// Fallback for client-side routing (SPA)
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.status(404).json({ message: "Not Found" });
  } else {
    next();
  }
});

app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})