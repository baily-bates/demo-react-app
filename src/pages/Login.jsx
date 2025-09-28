import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must start with valid country code (e.g. +1, +91");
      return;
    }
    setError("");
    navigate("/");
  };
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Sign in with phone number</p>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label htmlFor="phone-number">Phone Number: </label>
            <input
              type="text"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1XXXXXXXXXX"
            />
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
