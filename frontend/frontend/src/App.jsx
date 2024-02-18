import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Transfer,Signin,Signup,Dashboard} from '../compConf'
function App() {
  return (
    <BrowserRouter>
    <Routes>
   <Route path='/signup' element={<Signup></Signup>}></Route>
   <Route path='/signin' element={<Signin></Signin>}></Route>
   <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
   <Route path='/transefer' element={<Transfer></Transfer>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App