import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const View = () => {
  const { empId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee/${empId}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  if (!employee) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
          <h4 className="mb-0">Employee Details</h4>
          <button className="btn btn-light" onClick={() => navigate("/")}>
            <FaArrowLeft className="me-2" />
            Back
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6"><strong>ID:</strong></div>
            <div className="col-md-6">{employee.empId}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6"><strong>Name:</strong></div>
            <div className="col-md-6">{employee.empName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6"><strong>Email:</strong></div>
            <div className="col-md-6">{employee.empEmail}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6"><strong>Mobile:</strong></div>
            <div className="col-md-6">{employee.empMobile}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6"><strong>DOB:</strong></div>
            <div className="col-md-6">{new Date(employee.empDOB).toLocaleDateString('en-GB')}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6"><strong>Gender:</strong></div>
            <div className="col-md-6">{employee.empGender}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6"><strong>Native:</strong></div>
            <div className="col-md-6">{employee.empNative}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
