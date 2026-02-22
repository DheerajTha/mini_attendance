import { useEffect, useState } from "react";
import API from "../api/axios";

export default function CheckInOut() {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchToday = async () => {
    const res = await API.get("/attendance/today");
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchToday();
  }, []);

  const checkIn = async () => {
    setLoading(true);
    await API.post("/attendance/checkin");
    fetchToday();
    setLoading(false);
  };

  const checkOut = async () => {
    setLoading(true);
    await API.post("/attendance/checkout");
    fetchToday();
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Today Attendance</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={checkIn}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={attendance?.checkIn}
        >
          {loading ? "..." : "Check In"}
        </button>

        <button
          onClick={checkOut}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={!attendance?.checkIn || attendance?.checkOut}
        >
          {loading ? "..." : "Check Out"}
        </button>
      </div>

      {attendance && (
        <div className="text-gray-700 space-y-1">
          <p>Date: {new Date(attendance.date).toLocaleDateString()}</p>
          {attendance.checkIn && (
            <p>Check In: {new Date(attendance.checkIn).toLocaleTimeString()}</p>
          )}
          {attendance.checkOut && (
            <p>
              Check Out:{" "}
              {new Date(attendance.checkOut).toLocaleTimeString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}