import React, { useState } from "react";
import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import axios for making the HTTP request

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend with email and password for admin signup
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/admin/register`,
        { email, password }
      );

      if (response.status === 200) {
        // If signup is successful, redirect to the dashboard page
        navigate("/dashboard"); // Adjust the route if needed
      }
    } catch (error) {
      // Handle error, display error message
      if (error.response) {
        setError(error.response.data.error); // Set the error message from the response
      } else {
        setError("Server error, please try again later."); // Generic error message
      }
    }
  };

  const handlePasswordToggle = () => {
    const password = document.getElementById("password");

    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Admin Register</h2>
        <p className="intro-text">
          Manage courses, students, and faculty effortlessly. Let's make
          learning smoother!
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fa-solid fa-user input-icon"></i>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
          </div>
          <div className="input-container">
            <i className="fa-solid fa-envelope input-icon"></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
          </div>
          <div className="input-container">
            <i className="fa-solid fa-lock input-icon"></i>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
            <i
              className="fa-solid fa-eye password-visible" onClick={() => setShowPassword(!showPassword)}></i>
          </div>
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
        <div className="login-signup-container">
          <span className="login-signup-message">Already an User?</span>
          <Link className="login-signup-clickable" to="/">
            Login Here
          </Link>
        </div>
        {error && <p className="signup-error">{error}</p>}{" "}
        {/* Display error message */}
      </div>
    </div>
  );
};

export default SignUp;
