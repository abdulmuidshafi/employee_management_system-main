import express from 'express';
import {
  trackAttendance,
  getEmployeeAttendance,
  updateAttendanceRecord,
} from '../controller/AttendanceController.js';

const router = express.Router();

// Routes for employee attendance
router.post('/', trackAttendance);
router.get('/:id', getEmployeeAttendance);
router.put('/:id', updateAttendanceRecord);

export default router;