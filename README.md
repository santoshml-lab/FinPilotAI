# 💰 FinPilot AI
<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-orange)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render)

</p>

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

🛠️ Tech Stack
Frontend
React
Vite
JavaScript
React Router
Recharts
Backend
Python
FastAPI
Uvicorn
Groq API
Database & Authentication
Supabase
PostgreSQL
Supabase Authentication
Row Level Security
Deployment
Vercel
Render
📊 Dashboard Analytics
FinPilot AI converts transaction data into useful financial metrics.
Income
   +
Expenses
   ↓
Financial Summary
   ↓
Balance & Savings
   ↓
Spending Analysis
   ↓
AI Financial Insight
The dashboard provides a quick overview of the user's current financial activity.
🤖 AI Financial Insight System
The AI system follows this process:
User Transactions
       ↓
Calculate Income
       ↓
Calculate Expenses
       ↓
Calculate Savings
       ↓
Find Highest Spending Category
       ↓
Send Summary to FastAPI
       ↓
Groq AI
       ↓
Generate Financial Insight

FinPilotAI/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   └── AIInsight.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── AddTransaction.jsx
│   │
│   └── lib/
│       └── supabase.js
│
├── package.json
├── vite.config.js
└── README.md

FinPilotAI-Backend/
│
├── main.py
├── requirements.txt
├── .env.example
└── README.md
🎯 Project Goals
FinPilot AI was built to explore how modern technologies can work together to create a practical full-stack AI application.
The project demonstrates:
Frontend development
Backend API development
Authentication
Database integration
Row Level Security
Data analytics
AI integration
Cloud deployment
🔮 Future Improvements
Planned improvements include:
💰 AI Budget Recommendations
📅 Monthly AI Financial Reports
🚨 Smart Spending Alerts
🎯 Financial Goal Tracking
📄 PDF Financial Reports
📈 Advanced Spending Forecasts
🧠 More Personalized AI Recommendations
📊 Advanced Financial Analytics
🎥 Demo
A complete project demonstration will showcase:
Login
  ↓
Dashboard
  ↓
Add Transaction
  ↓
Financial Analytics
  ↓
Recent Transactions
  ↓
AI Financial Insight
  ↓
Refresh AI Insight
💡 Why FinPilot AI?
Traditional expense trackers mainly show numbers.
FinPilot AI goes one step further:
Raw Financial Data
        ↓
Analytics
        ↓
AI Understanding
        ↓
Practical Insight
The goal is to make financial data easier to understand and act upon.
👨‍💻 Built As a Learning & Portfolio Project
FinPilot AI is a portfolio project focused on full-stack development, cloud databases, analytics, and generative AI.
It was built step-by-step with a focus on creating a real, working product rather than a static UI concept.
⭐ Support
If you find FinPilot AI interesting, consider giving the repository a ⭐ star.
