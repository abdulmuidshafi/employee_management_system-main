import React from 'react';
import Button from 'react-bootstrap/Button';
import AxiosInstance from "../api/AxiosInstance";

const DeactivateUser = ({ id, onDeactivate }) => {
  const handleDeactivate = async () => {
    try {
      await AxiosInstance.patch(`/user/${id}/deactivate`);
      onDeactivate(id);
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDeactivate}>
      Deactivate
    </Button>
  );
};

export default DeactivateUser;