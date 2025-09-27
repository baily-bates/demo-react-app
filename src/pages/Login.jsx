import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1>Login Page</h1>
      <p>Please enter phone number to sign in</p>
      <form onSubmit={handleSubmit}>
        <div>
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
  );
}

export default Login;
