import React from 'react';
import Button from 'react-bootstrap/Button';
 
import AxiosInstance from "../api/AxiosInstance";
const ActivateUser = ({ id, onActivate }) => {
  const handleActivate = async () => {
    try {
      await AxiosInstance.patch(`/user/${id}/activate`);
      onActivate(id);
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  return (
    <Button variant="success" onClick={handleActivate}>
      Activate
    </Button>
  );
};

export default ActivateUser;