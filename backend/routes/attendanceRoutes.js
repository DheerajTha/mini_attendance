import express from "express";
import { checkIn, checkOut, myAttendance, todayAttendance } from "../controllers/attendanceController.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkin", Protect, checkIn);
router.post("/checkout", Protect, checkOut);
router.get("/today",Protect, todayAttendance);
router.get("/myAttendance", Protect, myAttendance);

export default router;