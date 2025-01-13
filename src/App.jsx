import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Nav from './Component/Nav'
import Home from './Component/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Add from './Pages/Add'
import Update from './Pages/Update'

const App = () => {
  return (
  <>
 
 <BrowserRouter>
 <Nav></Nav>
  <Routes>
   <Route exact path="/" element={<Add></Add>} />
   <Route exact path="/view" element={<Home></Home>}/>
   <Route exact path="/edituser" element={<Update></Update>}/>
  </Routes>
 </BrowserRouter>
  </>
  )
}

export default App