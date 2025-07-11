
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
 import { Link} from 'react-router';

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const result = await axios.get("http://localhost:8081/employee/all");
      setEmployees(result.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const deleteEmployee = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the employee permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/employee/delete/${id}`);
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
        loadEmployees();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire('Error', 'Failed to delete employee', 'error');
      }
    }
  };

  return (
    <div className='container'> <br />
    <Link to="/add" className="btn btn-primary btn-lm mx-3">
                  Add employee
                </Link>
      <h2 className="mt-4 mb-4">Employee List</h2>
      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Native</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.empName}</td>
                <td>{emp.empMobile}</td>
                <td>{emp.empEmail}</td>
               <td>{new Date(emp.empDOB).toLocaleDateString('en-GB')}</td>
                <td>{emp.empGender}</td>
                <td>{emp.empNative}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(emp.empId)}
                  >
                    Delete
                  </button>
                 <Link to={`/edituser/${emp.empId}`} className="btn btn-primary btn-sm mx-2">
                  Edit
                </Link>
                <Link to={`/viewuser/${emp.empId}`} className="btn btn-info btn-sm mx-1">
                  View
                 </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;