import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleForgotPasswordClick}
        className="text-sm text-blue hover:underline focus:outline-none"
      >
        Forgot your password?
      </button>
    </div>
  );
};

export default ForgotPassword;