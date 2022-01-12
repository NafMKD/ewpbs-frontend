import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class AddNewForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      customer : {},
      customer_id : this.props.customer_id
    }
  }

  componentDidMount(){
    const api = "http://127.0.0.1:8000/api/customer/" + this.state.customer_id;
    axios
      .get(api)
      .then((res) => {
        this.setState({
          customer : res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
 
  // loding modal display
  loadingPage = () => {
    Swal.fire({
      width: "10%",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    Swal.showLoading();
    return <p>No data available...</p>;
  };

  // check eligibility
  checkEligibility = () =>{
    let isValid = true;
    let sp = this.state.customer.data.sp_information;
    for (let i = 0; i < Object.keys(sp).length; i++) {
      const element = sp[i];
      if(element.sp_id === 1) isValid = false;
    }

    return isValid;
  }

  // data view
  dataView = () => {
    Swal.close();
    return (
      <div className="card card-outline card-primary">
        <div className="card-header">
          <h3 className="card-title">Customer Detail:</h3>
        </div>
        <div className="card-body">
          {this.checkEligibility() ? "": (
            <div className="alert alert-danger">
              <h5><i className="icon fas fa-ban"/> Notice</h5>
              This Customer is alredy registerd!
            </div>
          )}
          <dl className="row">
            <dt className="col-md-2">Full Name:</dt>
            <dd className="col-md-10">{this.state.customer.data.customer_first_name} {this.state.customer.data.customer_middle_name} {this.state.customer.data.customer_last_name}</dd>
            <dt className="col-md-2">Region:</dt>
            <dd className="col-md-10">{this.state.customer.data.customer_region}</dd>
            <dt className="col-md-2">Phone:</dt>
            <dd className="col-md-10">{this.state.customer.data.customer_phone}</dd>
            <dt className="col-md-2">Town:</dt>
            <dd className="col-md-10">{this.state.customer.data.customer_town}</dd>
            <dt className="col-md-2">Kebele:</dt>
            <dd className="col-md-10">{this.state.customer.data.customer_kebele}</dd>
            <dt className="col-md-2">House No.:</dt>
            <dd className="col-md-10">{this.state.customer.data.customer_house_no}</dd>
          </dl>
        </div>
        {this.checkEligibility() ? (
        <div className="card-footer">
          <Link to="addnew">
          <button className="btn btn-primary float-right">
            Next <i className="fas fa-arrow-right ml-2"/>
          </button>
          </Link>
        </div>):""}
      </div>
    );
  };
  render(){
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Add Customer</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            {Object.keys(this.state.customer).length ? this.dataView() : this.loadingPage()}
          </div>
        </section>
      </div>
    );
  }
};

export default AddNewForm;
