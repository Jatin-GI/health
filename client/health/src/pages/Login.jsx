import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Handle login request
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true } // Include credentials to handle cookies
      );
      console.log("Login successful:", response.data);
      navigate("/"); // Navigate to the homepage or another protected page on success
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle signup request
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          email,
          name,
          password,
        },
        { withCredentials: true }
      );
      console.log("Signup successful:", response.data);
      navigate("/login"); // Navigate to the homepage or another protected page on success
    } catch (error) {
      console.error(
        "Signup Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle form submission (for both login and signup)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignUp) {
      await handleSignUp();
    } else {
      await handleLogin();
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {isSignUp ? "Create Account" : "Log In"}
        </p>
        <p>Please {isSignUp ? "sign up" : "log in"} to continue</p>

        {/* Name field only visible when signing up */}
        {isSignUp && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base"
        >
          {isSignUp ? "Create Account" : "Log In"}
        </button>

        <p>
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsSignUp(false)}
                className="text-[#5f6FFF] underline cursor-pointer"
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Need an account?{" "}
              <span
                onClick={() => setIsSignUp(true)}
                className="text-[#5f6FFF] underline cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
