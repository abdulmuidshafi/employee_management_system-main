import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Controller function to create a new leave request
export const createLeaveRequest = asyncHandler(async (req, res) => {
  const { employeeId, startDate, endDate, type,reason } = req.body;
console.log(employeeId);
  const employee = await User.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const leave = new Leave({
    employee: employee._id,
    startDate,
    endDate,
    type,
    status: 'Pending',
    reason
  });

  const createdLeave = await leave.save();

  res.status(201).json(createdLeave);
});

// Controller function to get all leave requests
export const getAllLeaveRequests = asyncHandler(async (req, res) => {
  const leaveRequests = await Leave.find({});

  res.json(leaveRequests);
});

// Controller function to get a single leave request by ID
export const getLeaveRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const leaveRequest = await Leave.findById(id).populate('employee');

  if (!leaveRequest) {
    res.status(404);
    throw new Error('No leave request found with that ID');
  }

  res.status(200).json(leaveRequest);
});

// Controller function to update the status of a leave request
export const updateLeaveRequestStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leaveRequest = await Leave.findById(id);

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    leaveRequest.status = status;

    const updatedLeaveRequest = await leaveRequest.save();

    res.json(updatedLeaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller function to get leave balances for an employee
export const getLeaveBalances = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const leaveBalances = {
    annualLeave: employee.annualLeaveBalance,
    sickLeave: employee.sickLeaveBalance,
    // Add more leave types as needed
  };

  res.json(leaveBalances);
});