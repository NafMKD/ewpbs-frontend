/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields : {},
      errors : {}
    }
  }

  // validation 
  validateStateInput = () =>{
    let fields = this.state.fields;
    let errors = {};
    let isValid = true;
    if(!fields['username'] || fields['username']===null){
        errors['username'] = "cannot be empty!";
        isValid = false;
    }

    if(!fields['password'] || fields['password']===null){
      errors['password'] = "cannot be empty!";
      isValid = false;
    }
    
    this.setState({errors});
    return isValid;
  }
  
  // login handler
  loginInit = (e) =>{
    e.preventDefault();
    if(this.validateStateInput()){
      Swal.fire({
        width: "10%",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      Swal.showLoading();
      const api = "http://127.0.0.1:8000/api/login?username="+this.state.fields['username']+"&password="+this.state.fields['password'];
      axios.get(api).then(res =>{
        this.props.loginHandler(res);
        Swal.close();
      }).catch(err =>{
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

  // input change handler
  inputHandler = (e,s) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  render() {
    return (
      <center>
        <div className="login-box mt-5">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <Link to="/" className="h1">
                <b>EWPBS</b>
              </Link>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              {this.props.stateD.errText ? (
              <div className="alert alert-danger">
                  <center>
                    <i className="icon fas fa-times-circle"/>
                    {this.props.stateD.errText}
                  </center>
              </div>
              ):" "}
              <form onSubmit={(e)=>{this.loginInit(e)}}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    className={
                      this.state.errors["username"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    value={
                      this.state.fields["username"]
                        ? this.state.fields["username"]
                        : ""
                    }
                    name="username"
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    className={
                      this.state.errors["password"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    value={
                      this.state.fields["password"]
                        ? this.state.fields["password"]
                        : ""
                    }
                    name="password"
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0">
                <Link to="registration/customer" className="text-center">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </center>
    );
  }
}
export default Login;
