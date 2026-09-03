import { useState } from "react";
import { Plus, Trash2, Target } from "lucide-react";

import { useExpenses } from "../context/ExpenseContext";

function Savings() {
  const {
    goals,
    addGoal,
    deleteGoal,
  } = useExpenses();

  const [form, setForm] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.target) return;

    addGoal(form);

    setForm({
      name: "",
      target: "",
      saved: "",
      deadline: "",
    });
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            FUTURE GOALS
          </span>

          <h1>Savings Goals</h1>

          <p>
            Save money for the things that matter.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Create Savings Goal</h2>

        <form
          className="goal-form"
          onSubmit={submit}
        >
          <input
            placeholder="Goal name"
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
            placeholder="Target amount"
            value={form.target}
            onChange={(e) =>
              setForm({
                ...form,
                target: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Already saved"
            value={form.saved}
            onChange={(e) =>
              setForm({
                ...form,
                saved: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.deadline}
            onChange={(e) =>
              setForm({
                ...form,
                deadline: e.target.value,
              })
            }
          />

          <button className="primary-button">
            <Plus size={17} />
            Create
          </button>
        </form>
      </div>

      <div className="goals-grid">
        {goals.map((goal) => {
          const percent =
            goal.target > 0
              ? Math.min(
                  (goal.saved / goal.target) *
                    100,
                  100
                )
              : 0;

          return (
            <div
              className="card goal-card"
              key={goal.id}
            >
              <div className="goal-top">
                <div className="goal-symbol">
                  <Target size={20} />
                </div>

                <button
                  className="delete-small"
                  onClick={() =>
                    deleteGoal(goal.id)
                  }
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <h2>{goal.name}</h2>

              <div className="goal-amount">
                <strong>
                  ₹{goal.saved.toLocaleString()}
                </strong>

                <span>
                  / ₹{goal.target.toLocaleString()}
                </span>
              </div>

              <div className="progress">
                <div
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              <div className="goal-footer">
                <span>
                  {Math.round(percent)}% complete
                </span>

                <span>
                  {goal.deadline
                    ? `Due ${goal.deadline}`
                    : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Savings;