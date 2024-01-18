import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';

const AddPayroll = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [grossSalary, setGrossSalary] = useState('');
    const [deductions, setDeductions] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AxiosInstance.post('/payrolls', {
        employeeId,
        paymentDate,
        grossSalary,
        deductions,
      });

      if (response.status === 201) {
        // Payroll entry created successfully
        // You can add any additional logic or UI updates here
        console.log('Payroll created:', response.data);
      }
    } catch (error) {
      console.error('Error creating payroll:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="employeeId">
    <Form.Label>Employee</Form.Label>
    <Form.Control as="select" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
    <option value="">Select an employee</option>
    {employees.map((employee) => (
    <option key={employee._id} value={employee._id}>
    {employee.name}
    </option>
    ))}
    </Form.Control>
    </Form.Group>
    
    ini
    Copy
      <Form.Group controlId="paymentDate">
        <Form.Label>Payment Date</Form.Label>
        <Form.Control
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
        />
      </Form.Group>
    
      <Form.Group controlId="grossSalary">
        <Form.Label>Gross Salary</Form.Label>
        <Form.Control
          type="number"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          required
        />
      </Form.Group>
    
      <Form.Group controlId="deductions">
        <Form.Label>Deductions</Form.Label>
        <Form.Control
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          required
        />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Create Payroll
      </Button>
    </Form>
  );
};

export default AddPayroll;