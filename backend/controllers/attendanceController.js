import Attendance from "../models/Attendance.js";

export const checkIn = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let record = await Attendance.findOne({
    user: req.user.id,
    date: today,
  });

  if (record && record.checkIn)
    return res.status(400).json({ message: "Already checked in" });

  if (!record) {
    record = await Attendance.create({
      user: req.user.id,
      date: today,
      checkIn: new Date(),
    });
  } else {
    record.checkIn = new Date();
    await record.save();
  }

  res.json(record);
};


export const checkOut = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const record = await Attendance.findOne({
    user: req.user.id,
    date: today,
  });

  if (!record || !record.checkIn)
    return res.status(400).json({ message: "Check in first" });

  if (record.checkOut)
    return res.status(400).json({ message: "Already checked out" });

  record.checkOut = new Date();
  await record.save();

  res.json(record);
};

export const todayAttendance = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const record = await Attendance.findOne({
    user: req.user.id,
    date: today,
  });

  res.json(record);
};

export const myAttendance = async (req, res) => {
  const records = await Attendance.find({ user: req.user.id });
  res.json(records);
};