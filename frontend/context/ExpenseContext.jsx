import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ExpenseContext = createContext(null);

const initialExpenses = [
  {
    id: 1,
    title: "College Cafeteria",
    category: "Food",
    amount: 180,
    date: "2026-09-03",
    payment: "UPI",
  },
  {
    id: 2,
    title: "Bus Pass",
    category: "Transport",
    amount: 500,
    date: "2026-09-02",
    payment: "Cash",
  },
  {
    id: 3,
    title: "Notebook",
    category: "Education",
    amount: 120,
    date: "2026-09-01",
    payment: "UPI",
  },
  {
    id: 4,
    title: "Movie",
    category: "Entertainment",
    amount: 350,
    date: "2026-08-30",
    payment: "Card",
  },
  {
    id: 5,
    title: "Coffee",
    category: "Food",
    amount: 90,
    date: "2026-08-29",
    payment: "UPI",
  },
];

const initialIncome = [
  {
    id: 1,
    title: "Monthly Allowance",
    amount: 10000,
    source: "Parents",
    date: "2026-09-01",
  },
  {
    id: 2,
    title: "Freelance Work",
    amount: 2500,
    source: "Freelance",
    date: "2026-09-02",
  },
];

const initialGoals = [
  {
    id: 1,
    name: "New Laptop",
    target: 60000,
    saved: 18000,
    deadline: "2027-03-01",
  },
  {
    id: 2,
    name: "Emergency Fund",
    target: 10000,
    saved: 4200,
    deadline: "2026-12-31",
  },
];

const initialSubscriptions = [
  {
    id: 1,
    name: "Spotify",
    amount: 119,
    cycle: "Monthly",
    nextDate: "2026-09-15",
  },
  {
    id: 2,
    name: "Netflix",
    amount: 199,
    cycle: "Monthly",
    nextDate: "2026-09-20",
  },
];

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem("income");
    return saved ? JSON.parse(saved) : initialIncome;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem("subscriptions");
    return saved ? JSON.parse(saved) : initialSubscriptions;
  });

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem("monthlyBudget");
    return saved ? Number(saved) : 10000;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem("monthlyBudget", monthlyBudget);
  }, [monthlyBudget]);

  const totalExpenses = useMemo(
    () =>
      expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      ),
    [expenses]
  );

  const totalIncome = useMemo(
    () =>
      income.reduce(
        (total, item) => total + Number(item.amount),
        0
      ),
    [income]
  );

  const remainingBudget = monthlyBudget - totalExpenses;

  const balance = totalIncome - totalExpenses;

  const categoryTotals = useMemo(() => {
    const result = {};

    expenses.forEach((expense) => {
      result[expense.category] =
        (result[expense.category] || 0) + Number(expense.amount);
    });

    return result;
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((current) => [
      {
        ...expense,
        id: Date.now(),
        amount: Number(expense.amount),
      },
      ...current,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((current) =>
      current.filter((expense) => expense.id !== id)
    );
  };

  const addIncome = (item) => {
    setIncome((current) => [
      {
        ...item,
        id: Date.now(),
        amount: Number(item.amount),
      },
      ...current,
    ]);
  };

  const deleteIncome = (id) => {
    setIncome((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const addGoal = (goal) => {
    setGoals((current) => [
      {
        ...goal,
        id: Date.now(),
        target: Number(goal.target),
        saved: Number(goal.saved || 0),
      },
      ...current,
    ]);
  };

  const deleteGoal = (id) => {
    setGoals((current) =>
      current.filter((goal) => goal.id !== id)
    );
  };

  const addSubscription = (subscription) => {
    setSubscriptions((current) => [
      {
        ...subscription,
        id: Date.now(),
        amount: Number(subscription.amount),
      },
      ...current,
    ]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        income,
        goals,
        subscriptions,

        monthlyBudget,
        setMonthlyBudget,

        totalExpenses,
        totalIncome,
        remainingBudget,
        balance,
        categoryTotals,

        addExpense,
        deleteExpense,

        addIncome,
        deleteIncome,

        addGoal,
        deleteGoal,

        addSubscription,
        deleteSubscription,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
}