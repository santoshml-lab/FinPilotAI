import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { supabase } from "../lib/supabase";

export default function IncomeExpenseChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChartData();
  }, []);

  async function loadChartData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("type, amount, transaction_date")
      .eq("user_id", user.id)
      .order("transaction_date", {
        ascending: true,
      });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const grouped = {};

    (transactions || []).forEach((item) => {
      const date = item.transaction_date;

      if (!grouped[date]) {
        grouped[date] = {
          date,
          income: 0,
          expenses: 0,
        };
      }

      if (item.type === "income") {
        grouped[date].income += Number(item.amount);
      } else {
        grouped[date].expenses += Number(item.amount);
      }
    });

    setData(Object.values(grouped));
    setLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "25px",
        borderRadius: "16px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        📊 Income vs Expenses
      </h2>

      <p style={{ color: "#94a3b8" }}>
        Track your financial activity over time.
      </p>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>
          Loading analytics...
        </p>
      ) : data.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>
          Add transactions to see your analytics.
        </p>
      ) : (
        <div style={{ width: "100%", height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="date"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
              />

              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "white",
                }}
              />

              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
