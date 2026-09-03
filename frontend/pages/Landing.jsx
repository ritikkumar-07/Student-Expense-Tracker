import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [budgetAlerts, setBudgetAlerts] =
    useState(true);

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            PREFERENCES
          </span>

          <h1>Settings</h1>

          <p>
            Customize your SpendWise experience.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="card">
          <h2>Notifications</h2>

          <div className="setting">
            <div>
              <strong>Push Notifications</strong>

              <span>
                Receive important account updates.
              </span>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) =>
                setNotifications(
                  e.target.checked
                )
              }
            />
          </div>

          <div className="setting">
            <div>
              <strong>Budget Alerts</strong>

              <span>
                Get notified when your budget is
                nearly used.
              </span>
            </div>

            <input
              type="checkbox"
              checked={budgetAlerts}
              onChange={(e) =>
                setBudgetAlerts(
                  e.target.checked
                )
              }
            />
          </div>
        </div>

        <div className="card">
          <h2>Currency</h2>

          <p className="muted">
            Select your preferred currency.
          </p>

          <select className="settings-select">
            <option>₹ Indian Rupee (INR)</option>
            <option>$ US Dollar (USD)</option>
            <option>€ Euro (EUR)</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Settings;