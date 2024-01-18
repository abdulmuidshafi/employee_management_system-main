import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await AxiosInstance.get(`/user/${userId}`);
      const users = response.data;
      setName(users.name);
      setEmail(users.email);
      setPassword(users.password);
      setRole(users.role);
      setPhone(users.phone);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
      phone,
    };

    try {
      await AxiosInstance.put(`/user/${userId}`, userData);
      toast.success('User updated');
      navigate('/user');
    } catch (error) {
      console.error(error);
      toast.error('Error updating user');
    }
  };

  return (
    <div className="p-3">
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
{ /*      <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
  </Form.Group>*/}
 

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

        <Button variant="primary" className="mt-3" type="submit">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;