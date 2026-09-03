import { Wallet } from "lucide-react";

function BudgetCard({ budget, spent }) {
  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  return (
    <div className="card budget-widget">
      <div className="widget-heading">
        <div>
          <span>MONTHLY BUDGET</span>
          <h2>₹{budget.toLocaleString()}</h2>
        </div>

        <div className="widget-icon">
          <Wallet size={19} />
        </div>
      </div>

      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="budget-widget-footer">
        <span>₹{spent.toLocaleString()} spent</span>

        <strong>
          {Math.round(percentage)}%
        </strong>
      </div>
    </div>
  );
}

export default BudgetCard;