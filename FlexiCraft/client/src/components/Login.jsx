import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sclogo from "../assets/scLogo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Check if tokens are in the response
        if (data.tokens) {
          localStorage.setItem("token", data.tokens.accessToken); // Store access token
          localStorage.setItem("refreshToken", data.tokens.refreshToken); // Store refresh token
          navigate("/dashboard"); // Navigate to the dashboard or another route
        } else {
          console.error("Tokens not found in response data");
        }
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/forgot-password",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setResetMessage("Password reset link sent to your email.");
      } else {
        setResetMessage("Failed to send reset link.");
      }
    } catch (error) {
      setResetMessage("Error occurred while sending reset link.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-neutral-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-md shadow-md"
      >
        <div className="flex justify-center items-center">
          <img
            className="h-10 w-10 justify-center mb-2"
            src={sclogo}
            alt="Logo"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Log In to{" "}
          <span className="text-transparent tracking-tight bg-gradient-to-r from-purple-500 to-purple-950 bg-clip-text">
            FlexiCraft
          </span>
        </h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Log In
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
        <p className="mt-2 text-center">
          <span
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-500 cursor-pointer"
          >
            Forgot Password?
          </span>
        </p>
      </form>

      {showForgotPassword && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Reset Password
            </h2>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 mb-4 border rounded bg-neutral-200"
              required
            />
            <button
              onClick={handleForgotPassword}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Send Reset Link
            </button>
            <p className="mt-4 text-center">{resetMessage}</p>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="mt-4 w-full p-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
