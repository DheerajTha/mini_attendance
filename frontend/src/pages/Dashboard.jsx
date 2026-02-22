import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskList from "../components/TaskList";
import AttendanceHistory from "../components/AttendanceHistory";
import { useNavigate } from "react-router-dom";
import CheckInOut from "../components/CheckInOut";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks/getTasks");
    setTasks(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <CheckInOut />
      <AttendanceHistory />
      <TaskList tasks={tasks} refresh={fetchTasks} />
    </div>
  );
}
