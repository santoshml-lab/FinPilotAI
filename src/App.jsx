import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";

function ComingSoon({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1>{title}</h1>
        <p style={{ color: "#94a3b8" }}>
          FinPilot AI — Coming Soon 🚀
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
  path="/add-transaction"
  element={<AddTransaction />}
/>

      {/* Dashboard - temporary */}
      <Route
  path="/dashboard"
  element={<Dashboard />}
/>
        
        
      

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
