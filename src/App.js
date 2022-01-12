import React, { Component } from 'react'
import Login from './components/Login'
import CustomerHome from './components/customer/Home'
import SpcHome from './components/spc/Home'
import SpHome from './components/sp/Home'
import AdminHome from './components/admin/Home'
import {Route, Routes} from 'react-router-dom'
import Addcustomer from './components/registrar/AddCustomer'
import TechHome from './components/technician/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/registration/customer" element={<Addcustomer/>}/>
          <Route path="/*" element={<CustomerHome />}/>
        </Routes>
      </div>
    )
  }
}
export default App