// EmployeeLeave component for the Employee side
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';

const EmployeeLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("token"))
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStartDate('');
    setEndDate('');
    setType('');
    setReason('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveRequestData = {
      employeeId:user._id,
      startDate,
      endDate,
      type,
      reason,
    };

    AxiosInstance.post('/leaves', leaveRequestData)
      .then((response) => {
        console.log(response.data);
        toast.success("Leave request submitted successfully!");
        setLeaveRequests([...leaveRequests, response.data]);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to submit leave request.");
      });

    handleCloseModal();
  };

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
      <div className="d-flex p-2 justify-content-between align-items-center">
        <h1>Leave Requests</h1>
        <Button 
          variant="primary"
          onClick={handleOpenModal}
        >
          Add Leave
        </Button>
      </div>

      {/* Leave Requests Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Status</th>
          {  user.role==="HR" &&  <td>action</td>}
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
              {user.role==="HR" &&  <td>   {leave.status === 'Pending' && (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleApprove(leave._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className='ms-2'
                      onClick={() => handleReject(leave._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}</td>}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Leave Request Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeLeaves;