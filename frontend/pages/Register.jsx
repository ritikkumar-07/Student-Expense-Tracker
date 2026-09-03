import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "profile",
      JSON.stringify({
        name,
        email,
      })
    );

    localStorage.setItem(
      "loggedIn",
      "true"
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          ₹
        </div>

        <h1>Create your account</h1>

        <p>
          Start taking control of your money.
        </p>

        <form onSubmit={submit}>
          <label>Name</label>

          <input
            required
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Your name"
          />

          <label>Email</label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
          />

          <label>Password</label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Create a password"
          />

          <button className="primary-button full">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;