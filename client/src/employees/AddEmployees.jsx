import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddEmployees = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      name,
      email,
      phone,
      salary,
      department,
    };

    try {
      const response = await AxiosInstance.post('/employees', employeeData);
      console.log(response.data);
      // Handle success, e.g., show success message, redirect, etc.
      navigate('/employees');
      toast.success('Successful employees creation');
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show error message, etc.
    }
  };

  return (
    <div className="p-3">
      <h1>Add Employees</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddEmployees;