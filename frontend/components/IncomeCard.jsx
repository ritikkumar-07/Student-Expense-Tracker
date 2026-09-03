import { Receipt } from "lucide-react";

function ExpenseCard({ title, amount, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon expense-icon">
        <Receipt size={20} />
      </div>

      <div>
        <span>{title}</span>

        <h3>₹{Number(amount).toLocaleString()}</h3>

        <small>{subtitle}</small>
      </div>
    </div>
  );
}

export default ExpenseCard;