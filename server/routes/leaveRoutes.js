import express from 'express';
import {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus,
  getLeaveBalances,
} from '../controller/LeaveControllers.js';

const router = express.Router();

// Routes for leave management
/*
router.route('/leave-requests')
  .post(createLeaveRequest)
  .get(getAllLeaveRequests);

router.route('/leave-requests/:id')
  .get(getLeaveRequestById)
  .put(updateLeaveRequestStatus);

router.route('/leave-balances/:employeeId')
  .get(getLeaveBalances);
*/
  router.post("/", createLeaveRequest);
router.get("/", getAllLeaveRequests);
//router.get("/dashboard", getDashboardProducts);
router.get("/:id", getLeaveRequestById);
router.put("/:id", updateLeaveRequestStatus);
router.get("/:employeeId", getLeaveBalances)
export default router;