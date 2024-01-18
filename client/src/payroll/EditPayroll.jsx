import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';

const EditPayroll = () => {
  const { id } = useParams();
  const history = useHistory();

  const [grossSalary, setGrossSalary] = useState('');
  const [deductions, setDeductions] = useState('');

  useEffect(() => {
    fetchPayrollEntry();
  }, []);

  const fetchPayrollEntry = async () => {
    try {
      const response = await AxiosInstance.get(`/payrolls/${id}`);

      if (response.status === 200) {
        const { grossSalary, deductions } = response.data;
        setGrossSalary(grossSalary);
        setDeductions(deductions);
      }
    } catch (error) {
      console.error('Error fetching payroll entry:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AxiosInstance.put(`/payrolls/${id}`, {
        grossSalary,
        deductions,
      });

      if (response.status === 200) {
        // Payroll entry updated successfully
        // You can add any additional logic or UI updates here
        console.log('Payroll updated:', response.data);
        history.push('/payrolls'); // Redirect to payroll list page
      }
    } catch (error) {
      console.error('Error updating payroll:', error);
    }
  };

  return (
    <div>
      <h2>Edit Payroll</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="grossSalary">
          <Form.Label>Gross Salary</Form.Label>
          <Form.Control
            type="number"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="deductions">
          <Form.Label>Deductions</Form.Label>
          <Form.Control
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditPayroll;