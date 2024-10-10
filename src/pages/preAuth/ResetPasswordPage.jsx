// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/inputs/TextInput'; // Assuming you have this component
import { showToast } from '../../components/Toast'; // Assuming you have a toast system
import api from '../../api'; // Axios instance

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = e => setEmail(e.target.value);
  const handleNewPasswordChange = e => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !newPassword || !confirmPassword) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/reset-password', { email, newPassword });

      if (response.data.message === 'Password reset successful') {
        showToast('Password has been reset successfully', 'success');
        navigate('/login'); // Redirect to login page after successful reset
      }
    } catch (error) {
      showToast('Error resetting password. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[91.3vh] py-9 bg-gradient-bg bg-cover bg-no-repeat p-3 flex justify-center items-center">
      <div className="bg-white2 sm:w-max flex flex-col w-full py-8 px-4 rounded-xl shadow-xl">
        <h1 className=" text-2xl font-extrabold text-center">Reset Password</h1>

        <form onSubmit={handleResetPassword}>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <button
            type="submit"
            className={`btn bg-blue-500 w-full mt-5 py-2 px-4 text-white rounded-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;