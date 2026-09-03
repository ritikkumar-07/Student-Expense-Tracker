import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useExpenses } from "../context/ExpenseContext";

function Analytics() {
  const {
    categoryTotals,
    totalExpenses,
    totalIncome,
  } = useExpenses();

  const data = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            FINANCIAL ANALYTICS
          </span>

          <h1>Analytics</h1>

          <p>
            Understand your spending patterns.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <span>Total Income</span>
            <h3>
              ₹{totalIncome.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Total Expenses</span>
            <h3>
              ₹{totalExpenses.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Savings Rate</span>

            <h3>
              {totalIncome
                ? Math.round(
                    ((totalIncome -
                      totalExpenses) /
                      totalIncome) *
                      100
                  )
                : 0}
              %
            </h3>
          </div>
        </div>
      </div>

      <div className="card analytics-chart">
        <h2>Expenses by Category</h2>

        <div className="large-chart">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="amount"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Analytics;