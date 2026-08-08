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

export default function MonthlySummary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMonthlyData();
  }, []);

  async function loadMonthlyData() {
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
      const month = item.transaction_date.slice(0, 7);

      if (!grouped[month]) {
        grouped[month] = {
          month,
          income: 0,
          expenses: 0,
        };
      }

      if (item.type === "income") {
        grouped[month].income += Number(item.amount);
      } else {
        grouped[month].expenses += Number(item.amount);
      }
    });

    const summary = Object.values(grouped).map((item) => ({
      ...item,
      savings: item.income - item.expenses,
    }));

    setData(summary);
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
        📅 Monthly Financial Summary
      </h2>

      <p style={{ color: "#94a3b8" }}>
        Compare your income, expenses and savings month by month.
      </p>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>
          Loading monthly summary...
        </p>
      ) : data.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>
          Add transactions to generate your monthly summary.
        </p>
      ) : (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
              />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
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

              <Bar
                dataKey="savings"
                name="Savings"
                fill="#38bdf8"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
