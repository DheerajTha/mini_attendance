import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 p-4">
      <form
        onSubmit={handleSignup}
        className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl p-10 shadow-xl w-96 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          Create Account
        </h1>

        {/* Name Input */}
        <div className="flex items-center gap-3 border-b border-gray-300 focus-within:border-indigo-500 transition">
          <FiUser className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 bg-transparent outline-none placeholder-gray-400"
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center gap-3 border-b border-gray-300 focus-within:border-indigo-500 transition">
          <FiMail className="text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 bg-transparent outline-none placeholder-gray-400"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center gap-3 border-b border-gray-300 focus-within:border-indigo-500 transition">
          <FiLock className="text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 bg-transparent outline-none placeholder-gray-400"
          />
        </div>

        {/* Signup Button */}
        <button className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition transform">
          Sign Up
        </button>

        <p className="text-center text-gray-600 text-sm mt-2">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}