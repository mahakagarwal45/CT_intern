import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

const Success = () => {
  const location = useLocation();
  const data = location.state?.formData || {};

  return (
    <div className="box-container">
      <div className="box-card">
        <h2>Submission Successful!</h2>
        <ul>
          <li><strong>First Name:</strong> {data.firstName}</li>
          <li><strong>Last Name:</strong> {data.lastName}</li>
          <li><strong>Username:</strong> {data.username}</li>
          <li><strong>Email:</strong> {data.email}</li>
          <li><strong>Password:</strong> {data.password}</li>
          <li><strong>Phone:</strong> {`${data.phoneCode} ${data.phoneNumber}`}</li>
          <li><strong>Country:</strong> {data.country}</li>
          <li><strong>City:</strong> {data.city}</li>
          <li><strong>PAN:</strong> {data.pan}</li>
          <li><strong>Aadhar:</strong> {data.aadhar}</li>
        </ul>
      </div>
    </div>
  );
};

export default Success;
