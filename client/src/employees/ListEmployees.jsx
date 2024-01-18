import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function ListEmployees() {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const filteredEmployee = employees.filter(employee=> employee.name.toLowerCase().includes(searchName.toLowerCase()))
console.log(filteredEmployee);
  useEffect(() => {
    fetchEmployees ();
  }, []);

  const fetchEmployees  = async () => {
    try {
      const response = await AxiosInstance.get("/employees", {
        params: { name: searchName },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleDelete = async (enployeeId) => {
    try {
      await AxiosInstance.delete(`/employees/${enployeeId}`);
      // Handle successful deletion
       toast.success("successful deletion");
      // e.g., show success message, update product list, etc.
      fetchEmployees ();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees ();
  };

  return (
    <div className="p-3">
    <div className="d-flex p-2 justify-content-between align-items-center">
      <h2>Employees List</h2>
      <Button 
        variant="primary"
      onClick={() => navigate("/employees/add")}>Add Employees</Button>
    </div>
{
<div className="my-3">
<Form onSubmit={handleSearch}>
 <Form.Control
   type="text"
   placeholder="Search by product name"
   value={searchName}
   onChange={(e) => setSearchName(e.target.value)}
 />
 <Button variant="primary" type="submit">
   Search
 </Button>
</Form>
</div>

}
   

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployee.map((employee,index) => (
          <tr key={employee._id}>
            <td>{index + 1}</td>
            <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.salary}</td>
              <td>{employee.department}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => navigate(`/employees/edit/${employee._id}`)}
              >
                Edit
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => handleDelete(employee._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
   
  );
}

export default ListEmployees;