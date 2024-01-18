import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
import { useParams,   } from 'react-router-dom';

const EditPerformance = () => {
  const { id } = useParams();
 // const history = useHistory();

  const [goals, setGoals] = useState('');
  const [achievements, setAchievements] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchPerformanceReview();
  }, []);

  const fetchPerformanceReview = async () => {
    try {
      const response = await AxiosInstance.get(`/performance-reviews/${id}`);

      if (response.status === 200) {
        const { goals, achievements, feedback } = response.data;
        setGoals(goals);
        setAchievements(achievements);
        setFeedback(feedback);
      }
    } catch (error) {
      console.error('Error fetching performance review:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.put(`/performance-reviews/${id}`, {
        goals,
        achievements,
        feedback,
      });

      if (response.status === 200) {
        // Redirect to the performance reviews page or any other desired page
        history.push('/performance-reviews');
      }
    } catch (error) {
      console.error('Error updating performance review:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        Update Performance Review
      </Button>
    </Form>
  );
};

export default EditPerformance;