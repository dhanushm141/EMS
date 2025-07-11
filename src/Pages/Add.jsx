import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Add = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    empName: "",
    empEmail: "",
    empDOB: "",
    empMobile: "",
    empGender: "",
    empNative: ""
  });

  const handleReset = () => {
  setUser({
    empName: "",
    empEmail: "",
    empDOB: "",
    empMobile: "",
    empGender: "",
    empNative: ""
  });
  setErrors({});
};

  const [errors, setErrors] = useState({});

  const { empName, empEmail, empDOB, empMobile, empGender, empNative } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};
    if (!empName.trim()) temp.empName = "Name is required";
    if (!empMobile.match(/^\d{10}$/)) temp.empMobile = "Mobile must be 10 digits";
    if (!empEmail.trim()) {
      temp.empEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(empEmail)) {
      temp.empEmail = "Invalid email format";
    }
    if (!empDOB) temp.empDOB = "DOB is required";
    if (!empGender) temp.empGender = "Gender is required";
    if (!empNative.trim()) temp.empNative = "Native is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:8081/employee/insert", user);
      Swal.fire({ icon: 'success', text: 'Data inserted successfully' });
      navigate("/");
    } catch (error) {
      const message = error.response?.data || "Something went wrong!";
      if (message.includes("Email")) {
        setErrors((prev) => ({ ...prev, empEmail: "Email already exists" }));
      } else if (message.includes("Mobile")) {
        setErrors((prev) => ({ ...prev, empMobile: "Mobile number already exists" }));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Insertion Failed',
          text: message
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <h4 className="mb-0 py-2 text-center">Employee Registration</h4>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">Employee Name</label>
                  <input
                    type="text"
                    name="empName"
                    className="form-control"
                    placeholder="Enter your name"
                    value={empName}
                    onChange={onInputChange}
                  />
                  {errors.empName && <div className="text-danger small">{errors.empName}</div>}
                </div>

                
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    name="empMobile"
                    className="form-control"
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    value={empMobile}
                    onChange={onInputChange}
                  />
                  {errors.empMobile && <div className="text-danger small">{errors.empMobile}</div>}
                </div>

                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="empEmail"
                    className="form-control"
                    placeholder="Enter your email"
                    value={empEmail}
                    onChange={onInputChange}
                  />
                  {errors.empEmail && <div className="text-danger small">{errors.empEmail}</div>}
                </div>

                
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="empDOB"
                    className="form-control"
                    value={empDOB}
                    onChange={onInputChange}
                  />
                  {errors.empDOB && <div className="text-danger small">{errors.empDOB}</div>}
                </div>

                
                <div className="mb-3">
                  <label className="form-label d-block">Gender</label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="empGender"
                      value="Male"
                      className="form-check-input"
                      checked={empGender === "Male"}
                      onChange={onInputChange}
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="empGender"
                      value="Female"
                      className="form-check-input"
                      checked={empGender === "Female"}
                      onChange={onInputChange}
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                  {errors.empGender && <div className="text-danger small mt-1">{errors.empGender}</div>}
                </div>

                
                <div className="mb-3">
                  <label className="form-label">Native Place</label>
                  <input
                    type="text"
                    name="empNative"
                    className="form-control"
                    placeholder="Enter your native place"
                    value={empNative}
                    onChange={onInputChange}
                  />
                  {errors.empNative && <div className="text-danger small">{errors.empNative}</div>}
                </div>

                
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button className="btn btn-success px-4" type="submit">
                    <FaCheck className="me-2" /> Submit
                  </button>
                   <button className="btn btn-outline-danger px-4" type="button" onClick={handleReset}>
                     <FaTimes className="me-2" /> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
