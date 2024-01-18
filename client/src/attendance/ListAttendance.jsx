import React, { useState, useEffect } from 'react';
import { Button, Table, Card, Badge } from 'react-bootstrap';
//import  AxiosInstance from 'axios';
import AxiosInstance from "../api/AxiosInstance"
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';
const AttendanceTracker = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const handleCheckIn = async () => {
    try {
      const response = await api/AxiosInstance.post('/attendances', {
        employeeId: 'your_employee_id', // Replace with the actual employee ID
        date: new Date().toISOString(),
        checkInTime: new Date().toLocaleTimeString(),
      });

      if (response.status === 201) {
        setIsClockedIn(true);
        setCheckInTime(response.data.checkInTime);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await  AxiosInstance.put(`/attendances/${attendanceRecords[0]._id}`, {
        checkOutTime: new Date().toLocaleTimeString(),
      });

      if (response.status === 200) {
        setIsClockedIn(false);
        setCheckInTime('');
        fetchAttendanceRecords();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await  AxiosInstance.get('/attendances/your_employee_id'); // Replace with the actual employee ID

      if (response.status === 200) {
        setAttendanceRecords(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderClockInButton = () => {
    return (
      <Button variant="primary" onClick={handleCheckIn}>
        Clock In
      </Button>
    );
  };

  const renderCheckOutButton = () => {
    return (
      <Button variant="danger" onClick={handleCheckOut}>
        Clock Out
      </Button>
    );
  };

  const renderAttendanceRecords = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.checkInTime}</td>
              <td>{record.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Card>
      <Card.Header>Attendance Tracker</Card.Header>
      <Card.Body>
        {isLoggedIn ? (
          <div>
            {isClockedIn ? (
              <div>
                <h4>You are currently clocked in.</h4>
                {renderCheckOutButton()}
              </div>
            ) : (
              <div>
                <h4>You are currently clocked out.</h4>
                {renderClockInButton()}
              </div>
            )}
            <h5>Attendance Records</h5>
            {renderAttendanceRecords()}
          </div>
        ) : (
          <Button onClick={() => setIsLoggedIn(true)}>Log In</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default AttendanceTracker;