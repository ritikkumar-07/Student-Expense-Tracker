import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { useExpenses } from "../context/ExpenseContext";

function Income() {
  const {
    income,
    totalIncome,
    addIncome,
    deleteIncome,
  } = useExpenses();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    source: "Parents",
    date: new Date()
      .toISOString()
      .split("T")[0],
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) return;

    addIncome(form);

    setForm({
      title: "",
      amount: "",
      source: "Parents",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            MONEY RECEIVED
          </span>

          <h1>Income</h1>

          <p>
            Track allowances, salary and other income.
          </p>
        </div>
      </div>

      <div className="stats-grid single-income">
        <div className="stat-card">
          <div className="stat-card-icon income-icon">
            ₹
          </div>

          <div>
            <span>Total Income</span>

            <h3>
              ₹{totalIncome.toLocaleString()}
            </h3>

            <small>This month</small>
          </div>
        </div>
      </div>

      <div className="two-column">
        <div className="card">
          <h2>Add Income</h2>

          <form
            className="expense-form"
            onSubmit={submit}
          >
            <label>Income name</label>

            <input
              placeholder="Monthly Allowance"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <label>Amount</label>

            <input
              type="number"
              placeholder="₹10,000"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
            />

            <label>Source</label>

            <select
              value={form.source}
              onChange={(e) =>
                setForm({
                  ...form,
                  source: e.target.value,
                })
              }
            >
              <option>Parents</option>
              <option>Scholarship</option>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Other</option>
            </select>

            <label>Date</label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />

            <button className="primary-button">
              <Plus size={17} />
              Add Income
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Income History</h2>

          <div className="expense-history">
            {income.map((item) => (
              <div
                className="history-row"
                key={item.id}
              >
                <div>
                  <strong>{item.title}</strong>

                  <span>
                    {item.source} · {item.date}
                  </span>
                </div>

                <strong className="income-text">
                  +₹
                  {Number(
                    item.amount
                  ).toLocaleString()}
                </strong>

                <button
                  className="delete-small"
                  onClick={() =>
                    deleteIncome(item.id)
                  }
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Income;