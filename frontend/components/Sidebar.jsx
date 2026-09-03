import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Receipt,
  Wallet,
  TrendingUp,
  Target,
  CreditCard,
  BarChart3,
  FileText,
  User,
  Settings,
  GraduationCap,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: Receipt,
  },
  {
    label: "Income",
    path: "/income",
    icon: TrendingUp,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: Wallet,
  },
  {
    label: "Budget",
    path: "/budget",
    icon: Wallet,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Savings",
    path: "/savings",
    icon: Target,
  },
  {
    label: "Subscriptions",
    path: "/subscriptions",
    icon: CreditCard,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">
          <GraduationCap size={23} />
        </div>

        <div>
          <strong>SpendWise</strong>
          <span>Student Finance</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">MAIN MENU</p>

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <User size={18} />
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </div>

      <div className="sidebar-tip">
        <div>💡</div>

        <strong>Money Tip</strong>

        <p>
          Track small expenses. They can add up faster than you
          think.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;