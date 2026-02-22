import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    user: req.user.id,
    title,
    description
  });

  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};