import React, { useState } from 'react';
import AxiosInstance from '../api/AxiosInstance'; // Assuming the Axios instance is in a file named AxiosInstance.js

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the reset password request to the server
      await AxiosInstance.post('/user/resetPassword', { password, confirmPassword });

      // Display a success message to the user
      setMessage('Password reset successfully');
      setError('');
    } catch (error) {
      // Display an error message to the user
      setMessage('');
      setError('Error resetting password');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetPassword;