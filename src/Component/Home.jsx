import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router';

const Home = () => {
  

  const [users,setUsers]=useState([]);

    useEffect(()=>{
     loadUsers();
    },[])

    const loadUsers=async ()=>{
        const result =await axios.get("http://localhost:8085/fetch");
        setUsers(result.data);
        
    }

    const deleteUser=async (empid)=>{
      await axios.delete(`http://localhost:8085/delete/${empid}`)
      loadUsers();
    }
  return (
    <div className='containers'>
    <br />
     <Link to="/"><button className='btn btn-outline-success'>Add Employee</button></Link>
        <div className='py-4'>
        <table class="table border shadow">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Emp Id</th>
      <th scope="col">Emp Name</th>
      <th scope="col">Emp Expec.Sal</th>
      <th scope="col">Emp Mail</th>
      <th scope="col">Emp DOB</th>
      <th scope="col">Emp Mobile</th>
      <th scope="col">Emp Gender</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
{
    users.map((users,index)=>(
      <tr>
 <th scope="row" key={index}>{index+1}</th>
      <td>{users.empid}</td>
      <td>{users.empname}</td>
      <td>{users.empsal}</td>
      <td>{users.empmail}</td>
      <td>{users.empdob}</td>
      <td>{users.empnum}</td>
      <td>{users.gender}</td>
      <td>
        <Link className='btn btn-primary mx-2'
        to={`/edituser`}>Update</Link>
      <Link className='btn btn-danger mx-2'
        onClick={()=>deleteUser(users.empid)} to={"/view"}>Delete</Link> 
         <Link className='btn btn-primary mx-2'
        to={`/edituser`}>Add Qualification</Link>
      </td>
    </tr>

    ))}
  </tbody>
</table>
        </div>
    </div>
  )
}

export default Home