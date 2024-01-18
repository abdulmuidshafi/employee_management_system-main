import Employee from '../models/Employee.js';
import asyncHandler from 'express-async-handler';

// Controller function to create a new employee
export const createEmployee = asyncHandler(async (req, res) => {
  const { name,email, phone, salary, department } = req.body;

  const employee = new Employee({
    name,
    email,
    phone,
    salary,
    department,
  });

  const createdEmployee = await employee.save();

  res.status(201).json(createdEmployee);
});

// Controller function to get all employees
export const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});

  res.json(employees);
};

// Controller function to get a single employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);

  if (!employee) {
    res.status(404);
    throw new Error("No employee found with that ID");
  }

  res.status(200).json(employee);
};

// Controller function to update an employee by ID
export const updateEmployee = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    console.log(id);
    const { name, email, phone, salary, department } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    employee.name = name;
    employee.email = email;
    employee.phone = phone;
    employee.salary = salary;
    employee.department = department;

    const updatedEmployee = await employee.save();

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Controller function to delete an employee by ID
export const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});