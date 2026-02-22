import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getTasks", Protect , getTasks);
router.post("/createTask", Protect, createTask);
router.put("/updateTask/:id", Protect, updateTask);
router.delete("/deleteTask/:id", Protect, deleteTask);

export default router;