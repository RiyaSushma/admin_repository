import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import axios from 'axios';  // Import axios for making the HTTP request

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State to store error messages
  const navigate = useNavigate();  // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend with email and password for admin login
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/admin/login`, { email, password });
      
      if (response.status === 200) {
        // If login is successful, redirect to the dashboard page
        navigate('/dash');  // Adjust the route if needed
      }
    } catch (error) {
      // Handle error, display error message
      if (error.response) {
        setError(error.response.data.error);  // Set the error message from the response
      } else {
        setError('Server error, please try again later.');  // Generic error message
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        <p className="intro-text">Manage courses, students, and faculty effortlessly. Let's make learning smoother!</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fa-solid fa-envelope input-icon"></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="input-container">
          <i className="fa-solid fa-lock input-icon"></i>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <i className="fa-solid fa-eye password-visible" onClick={() => setShowPassword(!showPassword)}></i>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="signup-login-container">
          <span className="signup-login-message">No Account?</span>
          <Link className="signup-login-clickable" to="/register">Register Here</Link>
        </div>
        {error && <p className="login-error">{error}</p>} {/* Display error message */}
      </div>
    </div>
  );
};

export default Login;