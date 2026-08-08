import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { supabase } from "../lib/supabase";

export default function SpendingByCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryData();
  }, []);

  async function loadCategoryData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("category, amount, type")
      .eq("user_id", user.id)
      .eq("type", "expense");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const grouped = {};

    (transactions || []).forEach((item) => {
      const category = item.category;

      if (!grouped[category]) {
        grouped[category] = 0;
      }

      grouped[category] += Number(item.amount);
    });

    const chartData = Object.entries(grouped).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

    setData(chartData);
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
        💳 Spending by Category
      </h2>

      <p style={{ color: "#94a3b8" }}>
        See where your money is going.
      </p>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>
          Loading spending data...
        </p>
      ) : data.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>
          Add expense transactions to see spending categories.
        </p>
      ) : (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                  />
                ))}
              </Pie>

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
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
