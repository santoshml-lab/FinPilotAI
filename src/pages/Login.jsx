import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Temporary login
    // Supabase authentication next step me connect karenge.
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #172554)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "420px",
          maxWidth: "100%",
          background: "rgba(15, 23, 42, 0.92)",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 25px 60px rgba(0,0,0,.4)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px" }}>💰</div>

          <h1 style={{ margin: "10px 0" }}>
            Welcome to{" "}
            <span style={{ color: "#38bdf8" }}>
              FinPilot AI
            </span>
          </h1>

          <p style={{ color: "#94a3b8" }}>
            Sign in to manage your finances smarter.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              outline: "none",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🔐 Sign In
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: "25px",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Create one
          </span>
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "11px",
            background: "transparent",
            border: "1px solid #334155",
            color: "#cbd5e1",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
