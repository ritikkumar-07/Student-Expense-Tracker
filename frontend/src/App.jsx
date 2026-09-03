import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Income from "../pages/Income";
import Transactions from "../pages/Transactions";
import Budget from "../pages/Budget";
import Analytics from "../pages/Analytics";
import Savings from "../pages/Savings";
import Subscriptions from "../pages/Subscriptions";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/expenses"
          element={<Expenses />}
        />

        <Route
          path="/income"
          element={<Income />}
        />

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/budget"
          element={<Budget />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/savings"
          element={<Savings />}
        />

        <Route
          path="/subscriptions"
          element={<Subscriptions />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
