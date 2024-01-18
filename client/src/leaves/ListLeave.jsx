// ListLeave.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AxiosInstance from "../api/AxiosInstance";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch leave requests
  useEffect(() => {
    AxiosInstance.get('/leaves')
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCancel = (leaveId) => {
    AxiosInstance.delete(`/leaves/${leaveId}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Leave request canceled!");
        const updatedLeaveRequests = leaveRequests.filter((leave) => leave.id !== leaveId);
        setLeaveRequests(updatedLeaveRequests);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to cancel leave request.");
      });
  };

  return (
    <div>
      <h1>Leave Requests</h1>

      {/* Leave Requests Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.type}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === 'Pending' && (
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(leave.id)}
                  >
                    Cancel
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Link to="/employee">Back to Employee Portal</Link>
    </div>
  );
};

export default ListLeave;