import { Routes, Route, Navigate } from "react-router-dom";

function Home() {
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
        padding: "30px",
      }}
    >
      <div>
        <div style={{ fontSize: "60px" }}>💰</div>

        <h1 style={{ fontSize: "48px", margin: "10px 0" }}>
          FinPilot <span style={{ color: "#38bdf8" }}>AI</span>
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
          }}
        >
          Your AI-powered personal finance command center.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
