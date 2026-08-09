# 💰 FinPilot AI

<p align="center">
  <strong>AI-Powered Personal Finance Management & Insights Platform</strong>
</p>

<p align="center">
  Track your money • Understand your spending • Get AI-powered insights
</p>

---

## 🚀 About FinPilot AI

FinPilot AI is a full-stack personal finance application designed to help users manage their income, expenses, savings, and spending patterns from one centralized dashboard.

The application combines modern web development, secure cloud data storage, financial analytics, and generative AI to transform raw transaction data into practical financial insights.

---

## ✨ Features

### 🔐 Authentication
- Secure user signup and login
- User-specific financial data
- Supabase Authentication

### 💸 Transaction Management
- Add income transactions
- Add expense transactions
- Track transaction categories
- View recent transactions
- User-specific transaction history

### 📊 Financial Dashboard
- Total Balance
- Total Income
- Total Expenses
- Total Savings
- Income vs Expense analytics
- Spending by category
- Monthly financial summary

### 🤖 AI Financial Insights
FinPilot AI analyzes the user's financial summary and generates personalized insights using Groq AI.

The AI considers:

- Income
- Expenses
- Savings
- Highest spending category

Users can refresh their AI insight whenever they want.

### 🔒 Security
- Supabase Row Level Security (RLS)
- User-specific database access
- Backend-only AI API credentials
- Groq API key stored securely as an environment variable

### 📱 Responsive Experience
Designed to work across desktop, tablet, and mobile screens.

---

## 🧠 AI Architecture

```text
┌──────────────────────┐
│    FinPilot Client   │
│   React + Vite       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Supabase       │
│ Auth + PostgreSQL    │
│       + RLS          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    FastAPI Backend   │
│       /ai API        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Groq AI        │
│ Financial Analysis   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Personalized AI      │
│ Financial Insight    │
└──────────────────────┘
