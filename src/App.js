import React, { Component } from 'react'
import Login from './components/Login'
import CustomerHome from './components/customer/Home'
import SpcHome from './components/spc/Home'
import SpHome from './components/sp/Home'
import AdminHome from './components/admin/Home'
import {Route, Routes} from 'react-router-dom'
import Addcustomer from './components/registrar/AddCustomer'
import TechHome from './components/technician/Home'
import axios from 'axios'
import Swal from 'sweetalert2'
import LogOut from './components/LogOut'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn : false,
      loginType : null,
      errText : null,
    }
  }

  componentDidMount(){
    if(localStorage.getItem('account_type')){
      if(localStorage.getItem('account_user')){
        this.setState({
          isLogedIn : true,
          loginType : localStorage.getItem('account_type'),
        });
      }
    }
  }

  // handle
  loginHandler = (resC) =>{
    Swal.fire({
      width: "10%",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    Swal.showLoading();
    if(resC.data.status === "error" ){
      this.setState({
        errText : resC.data.message
      });
    }else{
      const api = "http://127.0.0.1:8000/api/"+resC.data.type+"/"+resC.data.account_id;
      axios.get(api).then(res=>{
        localStorage.setItem('account_type', resC.data.type);
        localStorage.setItem('account_user',JSON.stringify(res.data.data));
        this.setState({
          isLogedIn : true,
          loginType : resC.data.type,
        });
        Swal.close();
      }).catch(err=>{
        Swal.close();
        if(err.response){
          console.error(err.data);
        }else{
          Swal.fire({
            title: 'Something went wrong!',
            icon: 'error',
            text: 'we loss connection to the database!',
            showCancelButton: false,
            showConfirmButton: false
          })
        }
      });
    }
  }

  logoutHandler = () =>{
    this.setState({
      isLogedIn : false,
      loginType : null,
      errText : null,
    });
  }

  renderPage = (e) =>{
    if(e==="admin"){
      return <Route path="/*" element={<AdminHome/>}/>;
    }else if(e==="customer"){
      return <Route path="/*" element={<CustomerHome/>}/>;
    }else if(e==="spc"){
      return <Route path="/*" element={<SpcHome/>}/>;
    }else if(e==="sp"){
      return <Route path="/*" element={<SpHome/>}/>;
    }else if(e==="spemployee"){
      return <Route path="/*" element={<TechHome/>}/>;
    }else{
      return <Route path="/*" element={<Login stateD ={this.state}  loginHandler={this.loginHandler}/>}/>
    }
  }

  render() {
    return (
      <div>
        <Routes>
        <Route path="/registration/customer" element={<Addcustomer/>}/>
        <Route path="/logout" element={<LogOut logoutHandler={this.logoutHandler}/>}/>
          {this.state.isLogedIn ? (
            this.renderPage(this.state.loginType)
          ) :(
            <Route path="/*" element={<Login stateD ={this.state}  loginHandler={this.loginHandler}/>}/>
          )}
        </Routes>
      </div>
    )
  }
}
export default App
