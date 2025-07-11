import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Nav from './Component/Nav'
import Home from './Component/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Add from './Pages/Add'
import Update from './Pages/Update'
import View from './Pages/View'

const App = () => {
  return (
  <>
 
 <BrowserRouter>
 <Nav></Nav>
  <Routes>
   <Route exact path="/" element={<Home></Home>} />
   <Route exact path="/add" element={<Add></Add>}></Route>
   <Route exact path="/edituser/:id" element={<Update />} />
   <Route exact path="/viewuser/:empId" element={<View />} />
  </Routes>
 </BrowserRouter>
  </>
  )
}

export default App