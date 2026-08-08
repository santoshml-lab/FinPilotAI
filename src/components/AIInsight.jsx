import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AIInsight() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsight();
  }, []);

  async function generateInsight() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("type, amount, category")
      .eq("user_id", user.id);

    if (error || !transactions || transactions.length === 0) {
      setInsight(
        "Add some income and expense transactions to receive financial insights."
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
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0;
        }

        categoryTotals[item.category] += Number(item.amount);
      });

    const topCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (income === 0) {
      setInsight(
        `Your current expenses are ₹${expenses.toLocaleString(
          "en-IN"
        )}. Add some income to get a clearer savings analysis.`
      );
    } else if (savings > 0) {
      setInsight(
        `You have positive cash flow of ₹${savings.toLocaleString(
          "en-IN"
        )}. ${
          topCategory
            ? `Your highest spending category is ${topCategory[0]} at ₹${topCategory[1].toLocaleString(
                "en-IN"
              )}.`
            : ""
        } Keep monitoring your expenses to maintain this trend.`
      );
    } else {
      setInsight(
        `Your expenses currently exceed your income by ₹${Math.abs(
          savings
        ).toLocaleString("en-IN")}. ${
          topCategory
            ? `Your highest spending category is ${topCategory[0]}.`
            : ""
        } Consider reviewing your recent expenses.`
      );
    }

    setLoading(false);
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
          Analyzing your finances...
        </p>
      ) : (
        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.7",
            marginBottom: 0,
          }}
        >
          {insight}
        </p>
      )}
    </div>
  );
}
