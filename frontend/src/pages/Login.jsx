import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FiLock, FiMail } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 p-4">
          <form
            onSubmit={handleLogin}
            className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl p-10 shadow-xl w-96 flex flex-col gap-6"
          >
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
              Login to Your Account
            </h1>
    
            
    
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
    
            {/* Login Button */}
            <button className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition transform">
              Login
            </button>
    
            <p className="text-center text-gray-600 text-sm mt-2">
              Already have an account?{" "}
              <span
                className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>
          </form>
        </div>
  );
}