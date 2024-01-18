import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";

const EditEmployees = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); 
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const { employeeId } = useParams();
  const navigate = useNavigate();
  console.log(employeeId);
  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await AxiosInstance.get(`/employees/${employeeId}`);
      const employee = response.data;
      setName(employee.name);
      setEmail(employee.email);
      setPhone(employee.phone); 
      setSalary(employee.salary);
      setDepartment(employee.department);
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };

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
      await AxiosInstance.put(`/employees/${employeeId}`, employeeData);
      // Handle successful employee update
      toast.success("Updated employee");
      navigate("/employees");
      // e.g., show success message, redirect, etc.
    } catch (error) {
      console.error(error);

      // Handle error
      // e.g., show error message, etc.
    }
  };

  return (
    <div className="p-3">
      <h2>Edit Employee</h2>
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

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" type="submit">
          Update Employee
        </Button>
      </Form>
    </div>
  );
};

export default EditEmployees;
// ;