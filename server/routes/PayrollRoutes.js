import express from 'express';
import {
  createPayroll,
  getEmployeePayroll,
  updatePayroll, 
} from '../controller/PayrollController.js';

const router = express.Router();

// Routes for managing payroll
router.post('/', createPayroll);
router.get('/:id', getEmployeePayroll);
router.put('/:id', updatePayroll);
export default router;