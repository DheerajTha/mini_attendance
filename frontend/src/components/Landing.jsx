import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg  max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Mini Attendance System</h1>
        <p className="text-gray-600">
          Keep track of attendance, assign tasks, and manage your students easily.
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 rounded border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}