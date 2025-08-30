import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white/10 dark:text-white rounded-xl shadow-xl dark:shadow-white/10 p-8 border border-green-200 backdrop-blur-lg">
      <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
        Login
      </h1>

      <form className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
        Don't have an account?{" "}
        <Link to="/register" className="text-green-500 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
