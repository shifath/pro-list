// filepath: /E:/Programming/Full Stack/to-do-list-solution-code/to-do-list-solution-code/view/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import TodoApp from './components/TodoApp';
require('dotenv').config();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
  const checkUserAuth = async ()=>{
    try {
      const response = await fetch(`${BACKEND_URL}/auth/checkuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      setIsAuthenticated(true)
  }  else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking user authentication:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
}

useEffect(() => {
  checkUserAuth();
}, []); // Empty dependency array ensures this runs only once on mount

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }
console.log(isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route  path="/"
         element={isAuthenticated ? <TodoApp /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={isAuthenticated? <TodoApp/> : <AuthPage onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;