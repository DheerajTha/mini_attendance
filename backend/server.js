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

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://mini-attendance-z2xs.vercel.app',
      'https://mini-attendance-z2xs-git-main-dheerajthas-projects.vercel.app'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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