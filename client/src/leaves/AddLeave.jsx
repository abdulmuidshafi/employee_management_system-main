import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
const AddLeave = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your form submission logic here
    // You can make an API call to send the leave request data to the server
    // Example code:
    const leaveRequestData = {
      employeeId,
      startDate,
      endDate,
      type,
    };

    // Make an API call to submit the leave request data
     AxiosInstance.post('/leaves', leaveRequestData)
       .then((response) => {
    //     // Handle success response
        console.log(response.data);
      })
      .catch((error) => {
    //     // Handle error response
        console.error(error);
       });

    // Reset the form fields
    setEmployeeId('');
    setStartDate('');
    setEndDate('');
    setType('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="employeeId">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          {/* Add more leave types as needed */}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddLeave;