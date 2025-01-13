import React from 'react'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <div>
<nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
    <div className="container-fluid">
    <a className="navbar-brand" href="#">Employee Details</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

   <Link to="/view"><button className='btn btn-outline-light'>View Details</button></Link>
   
  </div>
</nav>

    </div>
  )
}

export default Nav