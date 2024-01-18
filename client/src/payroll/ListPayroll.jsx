import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
import { Link } from 'react-router-dom';

const ListPayroll = () => {
  const [payrollEntries, setPayrollEntries] = useState([]);

  useEffect(() => {
    fetchPayrollEntries();
  }, []);

  const fetchPayrollEntries = async () => {
    try {
      const response = await AxiosInstance.get('/payrolls');

      if (response.status === 200) {
        setPayrollEntries(response.data);
      }
    } catch (error) {
      console.error('Error fetching payroll entries:', error);
    }
  };

  return (
    <div>
 
      <div className="d-flex p-2 justify-content-between align-items-center">
      <h2>payrolls List</h2>
      <Button 
        variant="primary"
      onClick={() => navigate("/payroll/add")}>Add</Button>
    </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Payment Date</th>
            <th>Gross Salary</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payrollEntries.map((payroll) => (
            <tr key={payroll._id}>
              <td>{payroll.employee}</td>
              <td>{payroll.paymentDate}</td>
              <td>{payroll.grossSalary}</td>
              <td>{payroll.deductions}</td>
              <td>{payroll.netSalary}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListPayroll;