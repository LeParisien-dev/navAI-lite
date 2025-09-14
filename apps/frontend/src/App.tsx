import { Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import { useAuth } from "./auth/AuthContext";

function Nav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 border-b border-cyan-500/30">
      <div className="text-xl font-bold tracking-wider text-cyan-400">
        NavAI-lite
      </div>

      <div className="flex gap-6 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/users" className="text-white hover:text-cyan-300 transition-colors">Users</Link>
            <Link to="/dashboard" className="text-white hover:text-cyan-300 transition-colors">Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg text-white font-semibold transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="text-white hover:text-cyan-300 transition-colors">Login</Link>
            <Link to="/register" className="text-white hover:text-cyan-300 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* [MODIF] Accueil = Login */}
        <Route path="/" element={<Login />} />

        {/* Pages protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/register" element={<Register />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
