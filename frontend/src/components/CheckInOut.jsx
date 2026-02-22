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
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Today Attendance</h2>

  {/* Buttons */}
  <div className="flex gap-4 mb-4">
    <button
      onClick={checkIn}
      className={`flex-1 py-2 rounded-xl font-semibold text-white transition 
        ${attendance?.checkIn ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
      disabled={attendance?.checkIn}
    >
      {loading ? "..." : "Check In"}
    </button>

    <button
      onClick={checkOut}
      className={`flex-1 py-2 rounded-xl font-semibold text-white transition
        ${!attendance?.checkIn || attendance?.checkOut
          ? "bg-red-300 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700"
        }`}
      disabled={!attendance?.checkIn || attendance?.checkOut}
    >
      {loading ? "..." : "Check Out"}
    </button>
  </div>

  {/* Attendance Info */}
  {attendance && (
    <div className="text-gray-700 space-y-2 border-t border-gray-200 pt-3">
      <p><span className="font-semibold">Date:</span> {new Date(attendance.date).toLocaleDateString()}</p>
      {attendance.checkIn && (
        <p><span className="font-semibold">Check In:</span> {new Date(attendance.checkIn).toLocaleTimeString()}</p>
      )}
      {attendance.checkOut && (
        <p><span className="font-semibold">Check Out:</span> {new Date(attendance.checkOut).toLocaleTimeString()}</p>
      )}
    </div>
  )}
</div>
  );
}