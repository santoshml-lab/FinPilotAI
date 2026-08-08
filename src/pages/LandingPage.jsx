import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 50%, #172554 100%)",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          height: "72px",
          padding: "0 7%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(148,163,184,.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ margin: 0 }}>
          💰 FinPilot <span style={{ color: "#38bdf8" }}>AI</span>
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid #475569",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          padding: "70px 7%",
          flexWrap: "wrap",
        }}
      >
        {/* Left */}
        <div style={{ maxWidth: "650px" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(56,189,248,.1)",
              border: "1px solid rgba(56,189,248,.25)",
              color: "#7dd3fc",
              padding: "8px 14px",
              borderRadius: "999px",
              marginBottom: "25px",
            }}
          >
            🤖 AI-powered personal finance
          </div>

          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              lineHeight: "1.05",
              margin: 0,
              fontWeight: 800,
            }}
          >
            Take control of your
            <span style={{ color: "#38bdf8" }}> money.</span>
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "20px",
              lineHeight: "1.7",
              marginTop: "25px",
              maxWidth: "600px",
            }}
          >
            Track your income, control expenses, manage budgets and get
            AI-powered insights — all from one intelligent finance platform.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "35px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/signup")}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "15px 28px",
                borderRadius: "12px",
                fontSize: "17px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🚀 Start Free
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #64748b",
                padding: "15px 28px",
                borderRadius: "12px",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              Explore Dashboard →
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          style={{
            width: "430px",
            maxWidth: "100%",
            background: "rgba(15,23,42,.85)",
            border: "1px solid rgba(148,163,184,.2)",
            borderRadius: "22px",
            padding: "25px",
            boxShadow: "0 25px 70px rgba(0,0,0,.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>Finance Overview</h3>

            <span
              style={{
                background: "rgba(34,197,94,.12)",
                color: "#4ade80",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            >
              ● Healthy
            </span>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "22px",
            }}
          >
            <p style={{ color: "#94a3b8", margin: 0 }}>
              Total Balance
            </p>

            <h1 style={{ margin: "8px 0", fontSize: "35px" }}>
              ₹1,84,500
            </h1>

            <span style={{ color: "#22c55e" }}>
              ↑ 12.8% this month
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                background: "#1e293b",
                padding: "18px",
                borderRadius: "14px",
              }}
            >
              <p style={{ color: "#94a3b8", margin: 0 }}>
                Income
              </p>
              <h2 style={{ color: "#22c55e" }}>₹72,000</h2>
            </div>

            <div
              style={{
                background: "#1e293b",
                padding: "18px",
                borderRadius: "14px",
              }}
            >
              <p style={{ color: "#94a3b8", margin: 0 }}>
                Expenses
              </p>
              <h2 style={{ color: "#f87171" }}>₹31,500</h2>
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              padding: "18px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg,#172554,#1e3a8a)",
            }}
          >
            <p style={{ margin: 0, color: "#bfdbfe" }}>
              🤖 AI Insight
            </p>

            <p style={{ marginBottom: 0, lineHeight: "1.5" }}>
              Your spending is under budget this month. Keep it up!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
                }
