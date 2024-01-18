import express from 'express';
import {
  createPerformanceReview,
  getEmployeePerformanceReviews,
  updatePerformanceReview,
  deletePerformanceReview,
} from '../controller/performanceController.js';

const router = express.Router();

// Routes for managing performance reviews
router.post('/', createPerformanceReview);
router.get('/:employeeId', getEmployeePerformanceReviews);
router.put('/:id', updatePerformanceReview);
router.delete('/:id', deletePerformanceReview);

export default router;