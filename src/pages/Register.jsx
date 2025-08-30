import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!name || !email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await register({ name, email, password, role });
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white/10 dark:text-white rounded-xl shadow-xl dark:shadow-white/10 p-8 border border-green-200 backdrop-blur-lg">
      <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
        Register
      </h1>

      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Name"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Borrower">Borrower</option>
          <option value="Librarian">Librarian</option>
        </select>

        <button
          type="submit"
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
