import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AddTransaction() {
  const navigate = useNavigate();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");

    if (!amount || !category) {
      setMessage("Please enter amount and category.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from("transactions")
        .insert({
          user_id: user.id,
          type,
          amount: Number(amount),
          category,
          description,
          transaction_date: transactionDate,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("✅ Transaction added successfully!");

      setAmount("");
      setCategory("");
      setDescription("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          maxWidth: "650px",
          margin: "0 auto",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 20px 50px rgba(0,0,0,.3)",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ← Back to Dashboard
        </button>

        <h1>💰 Add Transaction</h1>

        <p style={{ color: "#94a3b8" }}>
          Track your income and expenses.
        </p>

        {message && (
          <div
            style={{
              padding: "12px",
              margin: "20px 0",
              borderRadius: "10px",
              background: message.startsWith("✅")
                ? "rgba(34,197,94,.12)"
                : "rgba(239,68,68,.12)",
              color: message.startsWith("✅")
                ? "#86efac"
                : "#fca5a5",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Transaction Type</label>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
              marginBottom: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => setType("income")}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background:
                  type === "income" ? "#166534" : "#020617",
                color: "white",
                cursor: "pointer",
              }}
            >
              📈 Income
            </button>

            <button
              type="button"
              onClick={() => setType("expense")}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background:
                  type === "expense" ? "#991b1b" : "#020617",
                color: "white",
                cursor: "pointer",
              }}
            >
              📉 Expense
            </button>
          </div>

          <label>Amount</label>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="₹ Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select category</option>

            {type === "income" ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Other Income">Other Income</option>
              </>
            ) : (
              <>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other Expense">Other Expense</option>
              </>
            )}
          </select>

          <label>Description</label>

          <textarea
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: "100px",
              resize: "vertical",
            }}
          />

          <label>Date</label>

          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "10px",
              background: loading ? "#475569" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading
              ? "⏳ Saving..."
              : "💾 Save Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none",
};
