import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Dashboard} from './pages/Dashboard'
import {Transfer} from './pages/Transfer'
import Landing from './pages/Landing'
function App() {
  return (
    <BrowserRouter>
    <Routes>
   <Route path='/signup' element={<Signup></Signup>}></Route>
   <Route path='/' element={<Landing></Landing>}></Route>
   <Route path='/signin' element={<Signin></Signin>}></Route>
   <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
   <Route path='/transfer' element={<Transfer></Transfer>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App