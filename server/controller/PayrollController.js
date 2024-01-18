import Payroll from '../models/Payroll.js';
import Employee from '../models/Employee.js';
import asyncHandler from 'express-async-handler';

// Controller function to create a payroll entry
export const createPayroll = asyncHandler(async (req, res) => {
  const { employeeId, paymentDate, grossSalary, deductions } = req.body;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const netSalary = grossSalary - deductions;

  const payroll = new Payroll({
    employee: employee._id,
    paymentDate,
    grossSalary,
    deductions,
    netSalary,
  });

  const createdPayroll = await payroll.save();

  res.status(201).json(createdPayroll);
});

// Controller function to get payroll entries for an employee
export const getEmployeePayroll = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const payrollEntries = await Payroll.find({ employee: employee._id });

  res.json(payrollEntries);
});

// Controller function to update a payroll entry
export const updatePayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { grossSalary, deductions } = req.body;

    const payroll = await Payroll.findById(id);

    if (!payroll) {
      return res.status(404).json({ error: 'Payroll entry not found' });
    }

    payroll.grossSalary = grossSalary;
    payroll.deductions = deductions;
    payroll.netSalary = grossSalary - deductions;

    const updatedPayroll = await payroll.save();

    res.json(updatedPayroll);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});