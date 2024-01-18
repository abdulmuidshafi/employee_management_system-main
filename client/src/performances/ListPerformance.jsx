import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';

const ListPerformance = () => {
  const [performanceReviews, setPerformanceReviews] = useState([]);

  useEffect(() => {
    fetchPerformanceReviews();
  }, []);

  const fetchPerformanceReviews = async () => {
    try {
      const response = await AxiosInstance.get('/performance-reviews');

      if (response.status === 200) {
        setPerformanceReviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching performance reviews:', error);
    }
  };

  const handleEdit = (performanceReviewId) => {
    // Implement your edit action logic here
    console.log(`Edit performance review with ID: ${performanceReviewId}`);
  };

  const handleDelete = async (performanceReviewId) => {
    try {
      await AxiosInstance.delete(`/performance-reviews/${performanceReviewId}`);
      // Handle successful deletion
      toast.success('Performance review deleted successfully');
      fetchPerformanceReviews();
    } catch (error) {
      console.error('Error deleting performance review:', error);
      // Handle error
      toast.error('Error deleting performance review');
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Review Date</th>
          <th>Goals</th>
          <th>Achievements</th>
          <th>Feedback</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {performanceReviews.map((performanceReview) => (
          <tr key={performanceReview._id}>
            <td>{performanceReview.employeeId}</td>
            <td>{performanceReview.reviewDate}</td>
            <td>{performanceReview.goals}</td>
            <td>{performanceReview.achievements}</td>
            <td>{performanceReview.feedback}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => handleEdit(performanceReview._id)}
              >
                Edit
              </Button>
              {' '}
              <Button
                variant="danger"
                onClick={() => handleDelete(performanceReview._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListPerformance;