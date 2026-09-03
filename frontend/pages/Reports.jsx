import { useState } from "react";
import { Plus, Trash2, CreditCard } from "lucide-react";

import { useExpenses } from "../context/ExpenseContext";

function Subscriptions() {
  const {
    subscriptions,
    addSubscription,
    deleteSubscription,
  } = useExpenses();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    cycle: "Monthly",
    nextDate: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.amount) return;

    addSubscription(form);

    setForm({
      name: "",
      amount: "",
      cycle: "Monthly",
      nextDate: "",
    });
  };

  const total = subscriptions.reduce(
    (sum, item) =>
      sum + Number(item.amount),
    0
  );

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            RECURRING EXPENSES
          </span>

          <h1>Subscriptions</h1>

          <p>
            Keep track of recurring payments.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <span>Monthly Cost</span>

            <h3>
              ₹{total.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Active Subscriptions</span>

            <h3>{subscriptions.length}</h3>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Add Subscription</h2>

        <form
          className="goal-form"
          onSubmit={submit}
        >
          <input
            placeholder="Spotify"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />

          <select
            value={form.cycle}
            onChange={(e) =>
              setForm({
                ...form,
                cycle: e.target.value,
              })
            }
          >
            <option>Monthly</option>
            <option>Yearly</option>
            <option>Weekly</option>
          </select>

          <input
            type="date"
            value={form.nextDate}
            onChange={(e) =>
              setForm({
                ...form,
                nextDate: e.target.value,
              })
            }
          />

          <button className="primary-button">
            <Plus size={17} />
            Add
          </button>
        </form>
      </div>

      <div className="subscription-grid">
        {subscriptions.map((item) => (
          <div
            className="card subscription-card"
            key={item.id}
          >
            <div className="subscription-icon">
              <CreditCard size={20} />
            </div>

            <div>
              <h2>{item.name}</h2>

              <span>{item.cycle}</span>
            </div>

            <strong>
              ₹{item.amount.toLocaleString()}
            </strong>

            <div className="subscription-bottom">
              <span>
                Next payment:{" "}
                {item.nextDate || "Not set"}
              </span>

              <button
                className="delete-small"
                onClick={() =>
                  deleteSubscription(item.id)
                }
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Subscriptions;