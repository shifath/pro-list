// filepath: /E:/Programming/Full Stack/to-do-list-solution-code/to-do-list-solution-code/view/src/components/AuthPage.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {isLogin ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <RegisterForm />
      )}
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;