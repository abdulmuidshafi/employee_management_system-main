/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
//import { Dashboard } from "./page/Dashboard";
import Login from "./page/Login";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "./layout/Layout"; 
import ResetPassword from "./page/ResetPassword";
import ForgetPassword from "./page/ForgetPassword";
import User from "./page/User";
import ListUsers from "./users/ListUesrs";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
import Employee from "./page/Employee ";
import ListEmployees from "./employees/ListEmployees";
import AddEmployees from "./employees/AddEmployees";
import EditEmployees from "./employees/EditEmployees";
import Leaves from "./page/Leaves";
import ListLeave from "./leaves/ListLeave";
import AddLeave from "./leaves/AddLeave";
import Hr from "./page/Hr";
import HRLeave from "./hr/HRLeave";
import EmployeeLeaves from "./emloyeeleave/EmployeeLeaves";
import EmployeeLeave from "./page/employeeLeave";
import Attendance from "./page/Attendance";
import ListAttendance from "./attendance/ListAttendance";
import Payroll from "./page/Payroll";
import ListPayroll from "./payroll/ListPayroll";
import AddPayroll from "./payroll/AddPayroll";
//import EditPayroll from "./payroll/EditPayroll";
import Performance from "./page/Performance"
import ListPerformance from "./performances/ListPerformance";
import AddPerformance from "./performances/AddPerformance";
import EditPerformance from "./performances/EditPerformance";
//import EmployeeLeave from "./page/EmployeeLeave"
//import User from "./user/User";
//import UserList from "./user/UserList";
function App() {
  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Route> */}
      <Route element={<ProtectedRoute />}>

         <Route path="/" element={<Layout />}>
        {/*<Route path="/" element={<Dashboard />} />*/}  
          <Route path="employees" element={<Employee />}>
            <Route index element={<ListEmployees />} />
            <Route path="add" element={<AddEmployees />} />
            <Route path="edit/:employeeId" element={<EditEmployees />} />
          </Route> 
          <Route path="leaves" element={< Leaves />}>
            <Route index element={<ListLeave />} /> 
            <Route path="add" element={<AddLeave />} />
          </Route> 
          <Route path="hr" element={< Hr />}>
            <Route index element={<HRLeave/>} />  
          </Route> 
          <Route path="employee" element={< EmployeeLeave />}>
            <Route index element={<EmployeeLeaves/>} />  
          </Route> 
          <Route path="attendances" element={< Attendance />}>
            <Route index element={<ListAttendance/>} />  
          </Route> 
          <Route path="payroll" element={<Payroll />}>
            <Route index element={<ListPayroll />} />
            <Route path="add" element={<AddPayroll />} />
            {/*<Route path="edit/:employeeId" element={<EditPayroll />} />*/}
          </Route> 
          <Route path="performance" element={<Performance />}>
            <Route index element={<ListPerformance />} />
            <Route path="add" element={<AddPerformance />} />
            {<Route path="edit/:employeeId" element={<EditPerformance />} />}
          </Route> 
                    <Route path="user" element={<User />}>
            <Route index element={<ListUsers />} />  
            <Route path="add" element={<CreateUser />} />
            <Route path="edit/:userId" element={<UpdateUser />} />
          </Route> 


    
        </Route>
      </Route>
       
        {/*    <ProtectedRoute path="/">
        <HomePage />
      </ProtectedRoute> */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
