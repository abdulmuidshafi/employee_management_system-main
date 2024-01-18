import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
//import { useHistory } from 'react-router-dom';

const AddPerformance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [goals, setGoals] = useState('');
  const [achievements, setAchievements] = useState('');
  const [feedback, setFeedback] = useState('');

  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post('/performance-reviews', {
        employeeId,
        reviewDate,
        goals,
        achievements,
        feedback,
      });

      if (response.status === 201) {
        // Redirect to the performance reviews page or any other desired page
        history.push('/performance-reviews');
      }
    } catch (error) {
      console.error('Error creating performance review:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="employeeId">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="reviewDate">
        <Form.Label>Review Date</Form.Label>
        <Form.Control
          type="date"
          value={reviewDate}
          onChange={(e) => setReviewDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="goals">
        <Form.Label>Goals</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="achievements">
        <Form.Label>Achievements</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="feedback">
        <Form.Label>Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Performance Review
      </Button>
    </Form>
  );
};

export default AddPerformance;