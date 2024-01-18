import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosInstance from '../api/AxiosInstance';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AxiosInstance.post('/user', {
        name,
        email,
        password,
        role,
        phone,
      });
      console.log('User created:', response.data);
      // Handle success or navigate to another page
      navigate("/user");
      toast.success(" Handle successful user creation");
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error
    }
  };

  return (
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

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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

      <Button variant="primary" type="submit">
        Create User
      </Button>
    </Form>
  );
};

export default CreateUser;