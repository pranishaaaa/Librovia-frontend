import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center gap-2 h-20 w-full dark:text-white bg-green-500 md:px-16 px-8 shadow-2xl">
      <div className="flex">
        <Link to="/">
          <span className="flex items-center gap-4 cursor-pointer">
            <img
              src="/favicon.jpg"
              className="rounded-full"
              height={48}
              width={48}
            />
            <span className="font-bold text-2xl hidden md:block">Librovia</span>
          </span>
        </Link>

        <button
          className="mr-auto md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </div>

      <div
        className={`flex-col md:flex-row font-medium gap-5 absolute md:static top-20 left-0 w-full md:w-auto bg-green-500 md:bg-transparent transition-all duration-200 z-10 ${
          open ? "flex" : "hidden md:flex"
        }`}
      >
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/history" className="hover:underline">
          History
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </div>

      <div className="flex">
        <button
          className="ml-auto flex justify-center items-center p-2 cursor-pointer rounded-full h-12 w-12"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
        >
          {dark ? (
            <Moon className="text-gray-300" />
          ) : (
            <Sun className="text-yellow-400" />
          )}
        </button>

        <span className="relative">
          <button
            className="focus:outline-none cursor-pointer rounded-full overflow-hidden  h-12 w-12 flex items-center"
            onClick={() => setProfileOpen((p) => !p)}
            aria-label="Profile"
          >
            <img
              src={user?.profilePicture || "/profile.png"}
              className="rounded-full object-contain"
              alt="Profile"
            />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-black rounded-lg shadow-lg dark:shadow-white/20 border z-20 p-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div>
                    <div className="text-lg">
                      Welcome, <span className="font-bold">{user?.name}</span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {user?.role}
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="px-4 py-2 transition duration-250 rounded bg-green-500 text-white hover:bg-green-600 text-center"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="px-4 py-2 transition duration-250 cursor-pointer rounded bg-red-500 text-white hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 cursor-pointer rounded bg-green-500 text-white hover:bg-green-600"
                  onClick={() => setProfileOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </span>
      </div>
    </nav>
  );
}
