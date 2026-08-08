import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data?.session) {
        navigate("/dashboard");
      } else {
        setSuccess(
          "Account created! Please check your email to confirm your account."
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          width: "430px",
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
            Create your{" "}
            <span style={{ color: "#38bdf8" }}>
              FinPilot AI
            </span>{" "}
            account
          </h1>

          <p style={{ color: "#94a3b8" }}>
            Start managing your finances smarter.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,.1)",
              border: "1px solid rgba(239,68,68,.3)",
              color: "#fca5a5",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "rgba(34,197,94,.1)",
              border: "1px solid rgba(34,197,94,.3)",
              color: "#86efac",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
            }}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#475569" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Creating account..." : "🚀 Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: "25px",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign in
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
