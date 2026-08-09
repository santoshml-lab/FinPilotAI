import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const API_URL = "YOUR_RENDER_BACKEND_URL";

export default function AIInsight() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    generateInsight();
  }, []);

  async function generateInsight() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: transactions, error: transactionError } =
        await supabase
          .from("transactions")
          .select("type, amount, category")
          .eq("user_id", user.id);

      if (transactionError) {
        throw transactionError;
      }

      if (!transactions || transactions.length === 0) {
        setInsight(
          "Add some income and expense transactions to receive AI financial insights."
        );
        setLoading(false);
        return;
      }

      const income = transactions
        .filter((item) => item.type === "income")
        .reduce(
          (sum, item) => sum + Number(item.amount),
          0
        );

      const expenses = transactions
        .filter((item) => item.type === "expense")
        .reduce(
          (sum, item) => sum + Number(item.amount),
          0
        );

      const savings = income - expenses;

      const categoryTotals = {};

      transactions
        .filter((item) => item.type === "expense")
        .forEach((item) => {
          const category = item.category || "Other";

          if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
          }

          categoryTotals[category] += Number(item.amount);
        });

      const topCategory = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
      )[0];

      const response = await fetch(`${API_URL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income,
          expenses,
          savings,
          top_category: topCategory
            ? topCategory[0]
            : "Unknown",
        }),
      });

      if (!response.ok) {
        throw new Error("AI backend request failed");
      }

      const result = await response.json();

      setInsight(
        result.insight ||
          "Unable to generate an AI insight right now."
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to FinPilot AI right now."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        marginTop: "30px",
        background:
          "linear-gradient(135deg, #1e293b, #172554)",
        padding: "25px",
        borderRadius: "16px",
        border: "1px solid #334155",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        🤖 AI Financial Insight
      </h2>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>
          🤖 FinPilot AI is analyzing your finances...
        </p>
      ) : error ? (
        <p
          style={{
            color: "#f87171",
            lineHeight: "1.7",
          }}
        >
          {error}
        </p>
      ) : (
        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.7",
            marginBottom: 0,
            whiteSpace: "pre-line",
          }}
        >
          {insight}
        </p>
      )}
    </div>
  );
}
