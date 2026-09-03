import { useState } from "react";
import { Search } from "lucide-react";

import { useExpenses } from "../context/ExpenseContext";
import TransactionItem from "../components/TransactionItem";

function Transactions() {
  const { expenses, deleteExpense } = useExpenses();

  const [search, setSearch] = useState("");

  const filtered = expenses.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.payment.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            ALL ACTIVITY
          </span>

          <h1>Transactions</h1>

          <p>
            View all your financial activity.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="transaction-toolbar">
          <div className="search-box inner">
            <Search size={17} />

            <input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <span>
            {filtered.length} transactions
          </span>
        </div>

        <div>
          {filtered.map((expense) => (
            <TransactionItem
              key={expense.id}
              expense={expense}
              onDelete={deleteExpense}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">
            No transactions found.
          </div>
        )}
      </div>
    </>
  );
}

export default Transactions;