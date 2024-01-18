import Attendance from '../models/AttendanceTracking.js';
import Employee from '../models/Employee.js';
import asyncHandler from 'express-async-handler';

// Controller function to create or update an attendance record
export const trackAttendance = asyncHandler(async (req, res) => {
  const { employeeId, date, checkInTime, checkOutTime } = req.body;
console.log(employeeId);
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  let attendance = await Attendance.findOne({ employee: employee._id, date });

  if (!attendance) {
    attendance = new Attendance({
      employee: employee._id,
      date,
      checkInTime,
      checkOutTime,
    });
  } else {
    attendance.checkInTime = checkInTime;
    attendance.checkOutTime = checkOutTime;
  }

  const trackedAttendance = await attendance.save();

  res.status(201).json(trackedAttendance);
});

// Controller function to get attendance records for an employee
export const getEmployeeAttendance = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const attendanceRecords = await Attendance.find({ employee: employee._id });

  res.json(attendanceRecords);
});

// Controller function to update attendance record
export const updateAttendanceRecord = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInTime, checkOutTime } = req.body;

    const attendanceRecord = await Attendance.findById(id);

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    attendanceRecord.checkInTime = checkInTime;
    attendanceRecord.checkOutTime = checkOutTime;

    const updatedAttendanceRecord = await attendanceRecord.save();

    res.json(updatedAttendanceRecord);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});