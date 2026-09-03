import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="mobile-logo">
        <div className="logo">
          <span>₹</span>
        </div>

        <strong>SpendWise</strong>
      </div>

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search transactions..."
        />
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          <Bell size={19} />

          <span className="notification-badge"></span>
        </button>

        <div className="navbar-avatar">
          PS
        </div>

        <div className="navbar-user">
          <strong>Priyanka</strong>
          <span>Student</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;