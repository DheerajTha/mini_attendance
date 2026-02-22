import { useState } from "react";
import API from "../api/axios";

export default function TaskList({ tasks, refresh }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const createTask = async () => {
    if (!title) return;
    setLoading(true);
    await API.post("/tasks/createTask", { title });
    setTitle("");
    refresh();
    setLoading(false);
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/updateTask/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    refresh();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>

      <div className="flex mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createTask}
          className="ml-2 bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span
              className={`${
                task.status === "completed" ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>

            <button
              onClick={() => toggleStatus(task)}
              className="text-sm bg-green-500 text-white px-2 py-1 rounded"
            >
              {task.status === "pending" ? "Complete" : "Undo"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}