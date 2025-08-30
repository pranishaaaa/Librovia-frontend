import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";
import About from "./pages/About";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <div className="flex-1 md:px-16 px-8 py-8 bg-[#ececec] dark:bg-[#0f1720]">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books/:isbn"
                element={
                  <ProtectedRoute>
                    <BookDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
