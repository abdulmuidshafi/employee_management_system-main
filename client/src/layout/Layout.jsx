import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);
  const navigate = useNavigate()
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="fw-bolder text-white">
            <i className="bi bi-building"></i> MyEmployee
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Employee Management" id="employee-dropdown">
              <LinkContainer to="/employees">
                <NavDropdown.Item>Employees</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/performance">
                <NavDropdown.Item>Performance</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/employee">
                <NavDropdown.Item>Eemployee leave</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/hr">
                <NavDropdown.Item>HR</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/attendances">
                <NavDropdown.Item>Attendance</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/payroll">
                <NavDropdown.Item>Payroll</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/leaves">
                <NavDropdown.Item>Leaves</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/user">
              <Nav.Link>User Management</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <Button
  className="btn-close text-white me-2"
  onClick={() =>{ 
    localStorage.removeItem("token")
    navigate("/login")
  }}
 
  aria-label="Logout"
  style={{ 
    // Optional custom styling:
    backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Slightly transparent background
    borderRadius: '50%',  // Rounded corners
    transition: 'all 0.2s ease-in-out',  // Smooth hover effect
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } // Highlight on hover
  }}
  
  />
      
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
