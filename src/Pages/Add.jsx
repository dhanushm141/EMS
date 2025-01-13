import React, { useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'

const Add = () => {
 

  let navigate=useNavigate()

  const handleClick=()=>{ 
    Swal.fire({
      text: "Data inserted Successfully",
      icon: "success"
    });
  }

  const [user,setUser]=useState({
       empid:"",
       empname:"",
       empsal:"",
       empmail:"",
       empdob:"",
       empnum:"",
       gender:""
  })

  const{empid,empname,empsal,empmail,empdob,empnum,gender}=user

  const onInputChange=(e)=>{
  setUser({...user,[e.target.name]:e.target.value });
  }
const onSubmit=async (e)=>{
   e.preventDefault();
   await axios.post("http://localhost:8085/insert",user)
   navigate("/view");
}

  return (
   <div className='container'>
<div className='row'>
<div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' >
<h2>Registration form</h2>

<form onSubmit={(e)=>onSubmit(e)}>
<div className='mb-3'>
<label htmlFor="empid" className='form-label'>Employee Id</label>
<input type={"text"} name="empid" id="" required className='form-control' placeholder='Enter your Id' value={empid} onChange={(e)=>onInputChange(e)}/>
</div>


<div className='mb-3'>
<label htmlFor="empname" className='form-label'>Employee Name</label>
<input type={"text"} name="empname" id="" required className='form-control' placeholder='Enter your Name' value={empname} onChange={(e)=>onInputChange(e)}/>
</div>


<div className='mb-3'>
<label htmlFor="empsal" className='form-label'>Employee Salary</label>
<input type={"text"} name="empsal" id="" required className='form-control' placeholder='Enter your Salary' value={empsal} onChange={(e)=>onInputChange(e)}/>
</div>


<div className='mb-3'>
<label htmlFor="empmail" className='form-label'>Employee E-Mail</label>
<input type={"text"} name="empmail" id="" required className='form-control' placeholder='Enter your E-Mail' value={empmail} onChange={(e)=>onInputChange(e)}/>
</div>


<div className='mb-3'>
<label htmlFor="empdob" className='form-label'>Employee DOB</label>
<input type={"date"} name="empdob" id="" required className='form-control' placeholder='Enter your Date-of-Birth' value={empdob} onChange={(e)=>onInputChange(e)}/>
</div>


<div className='mb-3'>
<label htmlFor="empnum" className='form-label'>Employee Mobile Number</label>
<input type={"tel"} name="empnum" id="" required className='form-control' placeholder='Enter your Mobile Number' maxLength={"10"} value={empnum} onChange={(e)=>onInputChange(e)}/>
</div>


<div>
<label htmlFor="gender" className='form-label'>Employee Gender</label> <br />
<input type={'radio'} name="gender" id="" required value={"Male"} onChange={(e)=>onInputChange(e)}/>Male <br />
<input type={'radio'} name='gender'  required value={"Female"} onChange={(e)=>onInputChange(e)} />Female
</div><br />


<div className="d-flex justify-content-center align-item-center gap-5" style={{ width: '100%' }}>
      <button className="btn btn-success" type='submit' onClick={handleClick}>Submit</button>
      <button className="btn btn-danger" type='reset'>Cancel</button>
    </div>
    </form>
</div>

</div>

   </div>
    
  )
}

export default Add