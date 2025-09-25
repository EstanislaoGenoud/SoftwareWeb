import React, { useState, useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login?.login(email, password);
      // Successful login will redirect via context
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-orange-400 items-center justify-center text-white p-10">
        <h1 className="text-5xl font-bold">Welcome Back!</h1>
      </div>

      {/* Panel Derecho */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        {login?.user ? (
          <Navigate to="/" replace />
        ) : (
          <div className="w-full max-w-md p-8">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-gray-500 mb-6">
              Welcome back! Please login to your account.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700">User Name</label>
                <input
                  type="email"
                  placeholder="username@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-600"
                  />
                  <span className="ml-2 text-gray-600">Remember Me</span>
                </label>
                <button type="button" className="text-purple-600 hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              New User?{" "}
              <Link
                to="/register"
                className="text-purple-600 font-semibold hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}