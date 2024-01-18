// HRLeave component for the HR side
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AxiosInstance from "../api/AxiosInstance";
import { toast } from 'react-toastify';

const HRLeave = () => {
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

  const handleApprove = (leaveId) => {
    AxiosInstance.put(`/leaves/${leaveId}`, { status: 'Approved' })
      .then((response) => {
        console.log(response.data);
        toast.success("Leave request approved!");
        const updatedLeaveRequests = leaveRequests.map((leave) => {
          if (leave.id === leaveId) {
            return {
              ...leave,
              status: 'Approved',
            };
          }
          return leave;
        });
        setLeaveRequests(updatedLeaveRequests);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to approve leave request.");
      });
  };

  const handleReject = (leaveId) => {
    AxiosInstance.put(`/leaves/${leaveId}`, { status: 'Rejected' })
      .then((response) => {
        console.log(response.data);
        toast.success("Leave request rejected!");
        const updatedLeaveRequests = leaveRequests.map((leave) => {
          if (leave.id === leaveId) {
            return {
              ...leave,
              status: 'Rejected',
            };
          }
          return leave;
        });
        setLeaveRequests(updatedLeaveRequests);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to reject leave request.");
      });
  };

  return (
    <div>
      <h1>Leave Requests (HR)</h1>

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
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleApprove(leave.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReject(leave.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HRLeave;