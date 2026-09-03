import { useState } from "react";
import {
  Plus,
  ArrowUpRight,
  Sparkles,
  Target,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useExpenses } from "../context/ExpenseContext";

import ExpenseCard from "../components/ExpenseCard";
import IncomeCard from "../components/IncomeCard";
import BudgetCard from "../components/BudgetCard";
import TransactionItem from "../components/TransactionItem";

const colors = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

function Dashboard() {
  const {
    expenses,
    totalExpenses,
    totalIncome,
    balance,
    monthlyBudget,
    categoryTotals,
  } = useExpenses();

  const [showExpenseForm, setShowExpenseForm] =
    useState(false);

  const categoryData = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const weeklyData = [
    { day: "Mon", amount: 320 },
    { day: "Tue", amount: 450 },
    { day: "Wed", amount: 280 },
    { day: "Thu", amount: 520 },
    { day: "Fri", amount: 390 },
    { day: "Sat", amount: 680 },
    { day: "Sun", amount: 430 },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            STUDENT FINANCE
          </span>

          <h1>
            Good evening, Priyanka 👋
          </h1>

          <p>
            Here's an overview of your finances.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowExpenseForm(true)
          }
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      <div className="stats-grid">
        <ExpenseCard
          title="Total Expenses"
          amount={totalExpenses}
          subtitle="This month"
        />

        <IncomeCard
          title="Total Income"
          amount={totalIncome}
          subtitle="This month"
        />

        <ExpenseCard
          title="Remaining Balance"
          amount={Math.max(balance, 0)}
          subtitle="Available money"
        />

        <div className="stat-card">
          <div className="stat-card-icon goal-icon">
            <Target size={20} />
          </div>

          <div>
            <span>Monthly Budget</span>

            <h3>
              ₹{monthlyBudget.toLocaleString()}
            </h3>

            <small>
              Spending limit
            </small>
          </div>
        </div>
      </div>

      <div className="dashboard-columns">
        <div className="card">
          <div className="card-heading">
            <div>
              <h2>Spending Overview</h2>
              <p>Your spending this week</p>
            </div>

            <div className="trend">
              <ArrowUpRight size={15} />
              8.2%
            </div>
          </div>

          <div className="large-chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eeeeee"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-heading">
            <div>
              <h2>Spending Categories</h2>
              <p>Where your money goes</p>
            </div>
          </div>

          <div className="pie-chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        colors[
                          index % colors.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="category-list">
            {categoryData.map((item, index) => (
              <div
                className="category-row"
                key={item.name}
              >
                <span>
                  <i
                    style={{
                      background:
                        colors[
                          index % colors.length
                        ],
                    }}
                  />

                  {item.name}
                </span>

                <strong>
                  ₹{item.value.toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-columns bottom">
        <div className="card">
          <div className="card-heading">
            <div>
              <h2>Recent Transactions</h2>
              <p>Your latest expenses</p>
            </div>
          </div>

          <div className="transactions-list">
            {expenses
              .slice(0, 5)
              .map((expense) => (
                <TransactionItem
                  key={expense.id}
                  expense={expense}
                />
              ))}
          </div>
        </div>

        <div className="card ai-panel">
          <div className="ai-title">
            <div className="ai-icon">
              <Sparkles size={19} />
            </div>

            <div>
              <h2>AI Financial Coach</h2>
              <p>Smart spending insight</p>
            </div>
          </div>

          <div className="ai-message">
            <strong>💡 Your spending insight</strong>

            <p>
              Your expenses are currently{" "}
              <b>
                {monthlyBudget > 0
                  ? Math.round(
                      (totalExpenses /
                        monthlyBudget) *
                        100
                    )
                  : 0}
                %
              </b>{" "}
              of your monthly budget.
            </p>

            <p>
              Try keeping your daily spending
              consistent to avoid exceeding your
              budget.
            </p>
          </div>

          <button className="secondary-button full">
            Ask AI about my spending
          </button>
        </div>
      </div>

      {showExpenseForm && (
        <QuickExpenseForm
          onClose={() =>
            setShowExpenseForm(false)
          }
        />
      )}
    </div>
  );
}

function QuickExpenseForm({ onClose }) {
  const { addExpense } = useExpenses();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    payment: "UPI",
    date: new Date()
      .toISOString()
      .split("T")[0],
  });

  const submit = (event) => {
    event.preventDefault();

    if (!form.title || !form.amount) return;

    addExpense(form);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-heading">
          <div>
            <h2>Add Expense</h2>
            <p>Record a new expense.</p>
          </div>

          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={submit}>
          <label>Expense name</label>

          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            placeholder="Lunch"
          />

          <label>Amount</label>

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            placeholder="₹0"
          />

          <label>Category</label>

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Other</option>
          </select>

          <label>Payment Method</label>

          <select
            value={form.payment}
            onChange={(e) =>
              setForm({
                ...form,
                payment: e.target.value,
              })
            }
          >
            <option>UPI</option>
            <option>Cash</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>

          <button
            className="primary-button full"
            type="submit"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;