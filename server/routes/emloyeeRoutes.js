import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controller/EmplooyeeController.js';

const router = express.Router();

// Routes for employee management 
  router.post("/", createEmployee);
  router.get("/", getAllEmployees);
 // router.get("/dashboard", getDashboardProducts);
  router.get("/:id", getEmployeeById);
  router.put("/:id", updateEmployee);
  router.delete("/:id", deleteEmployee);
export default router;