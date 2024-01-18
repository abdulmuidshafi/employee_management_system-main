import Performance from '../models/Performance .js';
import Employee from '../models/Employee.js';
import asyncHandler from 'express-async-handler';

// Controller function to create a performance review
export const createPerformanceReview = asyncHandler(async (req, res) => {
  const { employeeId, reviewDate, goals, achievements, feedback } = req.body;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const performanceReview = new Performance({
    employee: employee._id,
    reviewDate,
    goals,
    achievements,
    feedback,
  });

  const createdPerformanceReview = await performanceReview.save();

  res.status(201).json(createdPerformanceReview);
});

// Controller function to get performance reviews for an employee
export const getEmployeePerformanceReviews = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const performanceReviews = await Performance.find({ employee: employee._id });

  res.json(performanceReviews);
});

// Controller function to update a performance review
export const updatePerformanceReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { goals, achievements, feedback } = req.body;

    const performanceReview = await Performance.findById(id);

    if (!performanceReview) {
      return res.status(404).json({ error: 'Performance review not found' });
    }

    performanceReview.goals = goals;
    performanceReview.achievements = achievements;
    performanceReview.feedback = feedback;

    const updatedPerformanceReview = await performanceReview.save();

    res.json(updatedPerformanceReview);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller function to delete a performance review
export const deletePerformanceReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const performanceReview = await Performance.findById(id);

  if (!performanceReview) {
    return res.status(404).json({ error: 'Performance review not found' });
  }

  await performanceReview.remove();

  res.json({ message: 'Performance review removed' });
});