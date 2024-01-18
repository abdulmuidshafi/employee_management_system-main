import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance'; // Assuming the Axios instance is in a file named AxiosInstance.js

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the forget password request to the server
      await AxiosInstance.post('/user/ForgetPassword', { email });

      // Display a success message to the user
      setMessage('Reset password instructions sent to your email address');
      setError('');
    } catch (error) {
      // Display an error message to the user
      setMessage('');
      setError('Error sending reset password request');
      console.error('Error sending reset password request:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="w-50 mt-5">
        <h2>Forget Password</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div className="mt-3">
          <Link to="/reset-password/:resetToken">Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default ForgetPassword;