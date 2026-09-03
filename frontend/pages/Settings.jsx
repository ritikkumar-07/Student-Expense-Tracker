import { useState } from "react";
import { User, Save } from "lucide-react";

function Profile() {
  const [name, setName] =
    useState("Priyanka");

  const [email, setEmail] =
    useState("student@example.com");

  const [saved, setSaved] =
    useState(false);

  const save = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify({
        name,
        email,
      })
    );

    setSaved(true);

    setTimeout(
      () => setSaved(false),
      2000
    );
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">
            ACCOUNT
          </span>

          <h1>Profile</h1>

          <p>
            Manage your personal information.
          </p>
        </div>
      </div>

      <div className="card profile-card">
        <div className="profile-avatar">
          PS
        </div>

        <User size={20} />

        <label>Name</label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label>Email</label>

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="primary-button"
          onClick={save}
        >
          <Save size={17} />

          {saved
            ? "Saved!"
            : "Save Profile"}
        </button>
      </div>
    </>
  );
}

export default Profile;