// filepath: /E:/Programming/Full Stack/to-do-list-solution-code/to-do-list-solution-code/view/src/components/RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          // Handle the error properly, show an alert
          const data = await response.json();
          console.error('Registration failed:', data);
          alert(`Registration failed: ${data.message}`); // Example error handling.
        } else {
          // Handle successful registration, possibly by redirecting to a new page
          console.log('Registration successful!');
          alert('Registration successful!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;