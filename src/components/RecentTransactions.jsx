import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("transactions")
      .select(
        "id, type, amount, category, description, transaction_date"
      )
      .eq("user_id", user.id)
      .order("transaction_date", {
        ascending: false,
      })
      .limit(5);

    if (!error) {
      setTransactions(data || []);
    }

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
        📋 Recent Transactions
      </h2>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>
          Loading transactions...
        </p>
      ) : transactions.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>
          No transactions yet.
        </p>
      ) : (
        <div>
          {transactions.map((transaction) => {
            const isIncome =
              transaction.type === "income";

            return (
              <div
                key={transaction.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom:
                    "1px solid #334155",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isIncome
                        ? "rgba(34,197,94,.15)"
                        : "rgba(239,68,68,.15)",
                      fontSize: "20px",
                    }}
                  >
                    {isIncome ? "📈" : "📉"}
                  </div>

                  <div>
                    <strong>
                      {transaction.category}
                    </strong>

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#94a3b8",
                        fontSize: "13px",
                      }}
                    >
                      {transaction.description ||
                        "No description"}
                    </p>

                    <p
                      style={{
                        margin: "3px 0 0",
                        color: "#64748b",
                        fontSize: "12px",
                      }}
                    >
                      {transaction.transaction_date}
                    </p>
                  </div>
                </div>

                <strong
                  style={{
                    color: isIncome
                      ? "#22c55e"
                      : "#f87171",
                    fontSize: "16px",
                  }}
                >
                  {isIncome ? "+" : "-"}₹
                  {Number(
                    transaction.amount
                  ).toLocaleString("en-IN")}
                </strong>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
      }
