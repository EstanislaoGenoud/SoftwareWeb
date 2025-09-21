import { useState, useContext} from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useContext(AuthContext);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register?.register(email, password);
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-orange-400 items-center justify-center text-white p-10">
        <h1 className="text-5xl font-bold">Join Us!</h1>
      </div>
      {/* Panel Derecho */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        {register?.user ? (
          <Navigate to="/" replace />
        ) : (
          <div className="w-full max-w-md p-8">
            <h2 className="text-3xl font-bold mb-2">Register</h2>
            <p className="text-gray-500 mb-6">
              Create your account. It's free and only takes a minute.
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder=""
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
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
