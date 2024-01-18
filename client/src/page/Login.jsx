import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to authenticate the user
      const response = await AxiosInstance.post("/user/login", {
        email,
        password,
      });

      // Handle the successful login response
      toast.success("Login successful");

      // For example, you can store the authentication token in local storage and redirect the user
      localStorage.setItem("token", JSON.stringify(response.data));

      // Redirect the user to the desired page
      // Replace "/dashboard" with the actual path you want to redirect the user after login
      window.location.href = "/";
      setEmail("");
    setPassword("");
    } catch (error) {
      // Handle the login error
      console.error("Login error:", error);
      // setError(error?.response?.data.message);
      toast.error(error?.response?.data.message)
    }

    // Reset the form fields
    
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h1 className="text-center mb-4">Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;