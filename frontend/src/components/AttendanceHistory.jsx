import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AttendanceHistory() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await API.get("/attendance/myAttendance");
      setRecords(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Attendance History only day Record</h2>
      <ul className="space-y-1">
        {records.map((r) => (
          <li key={r._id} className="text-gray-700">
            {new Date(r.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}