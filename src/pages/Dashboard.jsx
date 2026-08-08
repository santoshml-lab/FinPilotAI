import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";


export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>⏳ Loading FinPilot...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>📊 FinPilot AI</h1>

          <p style={{ color: "#94a3b8" }}>
            Welcome back, {profile?.full_name || user?.email} 👋
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Total Balance
          </p>

          <h2>₹0</h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Income
          </p>

          <h2 style={{ color: "#22c55e" }}>
            ₹0
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Expenses
          </p>

          <h2 style={{ color: "#f87171" }}>
            ₹0
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Savings
          </p>

          <h2 style={{ color: "#38bdf8" }}>
            ₹0
          </h2>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "16px",
        }}
      >
        <h2>🤖 AI Financial Insight</h2>

        <p style={{ color: "#94a3b8" }}>
          Add your income and expenses to start receiving
          personalized financial insights.
        </p>
      </div>
    </div>
  );
}
