"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      console.log(response);
      if (response.ok) {
        alert("Signup successful");
        // Redirect or navigate to the login page after successful signup
        window.location.href = "/login";
      } else {
        alert("Signup failed. Please check your information.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
      <button
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Already a Member? Login
      </button>
    </div>
  );
}
