import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AxiosInstance from '../api/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const ListUsers = ({ onActivate, onDeactivate }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get('/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleActivate = async (id) => {
    try {
      await AxiosInstance.patch(`/user/${id}/activate`);
      fetchUsers();
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleDeactivate = async (id) => {
    console.log(id);
    try {
      await AxiosInstance.patch(`/user/${id}/diactivate`);
      fetchUsers();
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  return (
    <div>
      <h2>Users List</h2>
      <Button onClick={() => navigate("/user/add")}>Add User</Button>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          {<th>Password</th>}  
            <th>Role</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>
                {user.active ? (
                  <span>Active</span>
                ) : (
                  <span>Inactive</span>
                )}
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/user/edit/${user._id}`)}
                >
                  Edit
                </Button>{" "}
                {user.active ? (
                  <Button
                    variant="danger"
                    onClick={() => handleDeactivate(user._id)}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleActivate(user._id)}
                  >
                    Activate
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListUsers;