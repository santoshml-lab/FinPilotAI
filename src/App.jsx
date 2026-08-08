import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

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
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={<ComingSoon title="🔐 Login" />}
      />

      <Route
        path="/signup"
        element={<ComingSoon title="🚀 Create Account" />}
      />

      <Route
        path="/dashboard"
        element={<ComingSoon title="📊 Dashboard" />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
