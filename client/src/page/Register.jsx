import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to register the user
      const response = await axios.post("/register", {
        name,
        email,
        phone,
        password,
        role: "seller", // Set the default role for registration, you can change it based on your logic
      });

      // Handle the successful registration response
      // For example, you can display a success message to the user or redirect them to the login page
      console.log("Registration successful:", response.data);
    } catch (error) {
      // Handle the registration error
      console.error("Registration error:", error);
    }

    // Reset the form fields
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;