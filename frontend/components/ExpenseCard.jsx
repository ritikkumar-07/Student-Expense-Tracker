import {
  Utensils,
  Bus,
  BookOpen,
  ShoppingBag,
  Film,
  HeartPulse,
  MoreHorizontal,
} from "lucide-react";

const icons = {
  Food: Utensils,
  Transport: Bus,
  Education: BookOpen,
  Shopping: ShoppingBag,
  Entertainment: Film,
  Health: HeartPulse,
  Other: MoreHorizontal,
};

function TransactionItem({ expense, onDelete }) {
  const Icon = icons[expense.category] || MoreHorizontal;

  return (
    <div className="transaction-item">
      <div className="transaction-icon">
        <Icon size={18} />
      </div>

      <div className="transaction-info">
        <strong>{expense.title}</strong>

        <span>
          {expense.category} · {expense.payment}
        </span>
      </div>

      <div className="transaction-date">
        {expense.date}
      </div>

      <strong className="transaction-value">
        -₹{Number(expense.amount).toLocaleString()}
      </strong>

      {onDelete && (
        <button
          className="delete-small"
          onClick={() => onDelete(expense.id)}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default TransactionItem;