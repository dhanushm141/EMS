import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    empName: "",
    empEmail: "",
    empDOB: "",
    empMobile: "",
    empGender: "",
    empNative: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/employee/${id}`);
      setEmployee(result.data);
    } catch (error) {
      console.error("Error loading employee:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Unable to load employee data.',
      });
    }
  };

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const temp = {};
    const mobilePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!employee.empName.trim()) temp.empName = "Name is required";
    if (!employee.empEmail.trim()) temp.empEmail = "Email is required";
    else if (!emailPattern.test(employee.empEmail)) temp.empEmail = "Invalid email";

    if (!mobilePattern.test(employee.empMobile)) temp.empMobile = "Mobile must be 10 digits";
    if (!employee.empDOB) temp.empDOB = "Date of birth is required";
    if (!employee.empGender) temp.empGender = "Gender is required";
    if (!employee.empNative.trim()) temp.empNative = "Native place is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Validation failed", errors);
      return;
    }

    try {
      console.log("Sending PUT request:", employee);

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/employee/update/${id}`, employee);
      console.log("Response:", response.data);

      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Employee updated successfully!',
        confirmButtonColor: '#3085d6'
      });
      navigate("/");
    } catch (error) {
      console.error("Update error:", error.response || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update employee. Please try again.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <h3 className="text-center mb-4 text-primary">Edit Employee</h3>
            <form onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.empName ? "is-invalid" : ""}`}
                  name="empName"
                  value={employee.empName}
                  onChange={onInputChange}
                />
                {errors.empName && <div className="invalid-feedback">{errors.empName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.empEmail ? "is-invalid" : ""}`}
                  name="empEmail"
                  value={employee.empEmail}
                  onChange={onInputChange}
                />
                {errors.empEmail && <div className="invalid-feedback">{errors.empEmail}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className={`form-control ${errors.empMobile ? "is-invalid" : ""}`}
                  name="empMobile"
                  value={employee.empMobile}
                  onChange={onInputChange}
                  maxLength={10}
                />
                {errors.empMobile && <div className="invalid-feedback">{errors.empMobile}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${errors.empDOB ? "is-invalid" : ""}`}
                  name="empDOB"
                  value={employee.empDOB}
                  onChange={onInputChange}
                />
                {errors.empDOB && <div className="invalid-feedback">{errors.empDOB}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <div className="form-check form-check-inline ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="empGender"
                    value="Male"
                    checked={employee.empGender === "Male"}
                    onChange={onInputChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="empGender"
                    value="Female"
                    checked={employee.empGender === "Female"}
                    onChange={onInputChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
                {errors.empGender && <div className="text-danger mt-1">{errors.empGender}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Native Place</label>
                <input
                  type="text"
                  className={`form-control ${errors.empNative ? "is-invalid" : ""}`}
                  name="empNative"
                  value={employee.empNative}
                  onChange={onInputChange}
                />
                {errors.empNative && <div className="invalid-feedback">{errors.empNative}</div>}
              </div>

              <div className="d-flex justify-content-center gap-4 mt-4">
                <button type="submit" className="btn btn-success px-4">
                  <FaSave className="me-2" /> Update
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => navigate("/")}
                >
                  <FaTimes className="me-2" /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
