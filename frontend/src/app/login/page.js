"use client";
import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response);
      const data = await response.json();
      console.log("response");
      if (response.ok) {
        alert("Login successful");
        // Redirect or navigate to the user dashboard or other pages here
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <button
        onClick={() => {
          window.location.href = "/signup";
        }}
      >
        New User? Sign Up
      </button>
    </div>
  );
}
