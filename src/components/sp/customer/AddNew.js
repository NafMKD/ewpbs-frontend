import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import {Link} from 'react-router-dom'

class AddNew extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      customers : []
    };
  }

  // handle input change
  inputChangeHandler = (e) => {
    if(typeof e.target.value !=="undefined" && e.target.value !== null && e.target.value.length>0){
        const api = "http://127.0.0.1:8000/api/customer/search/"+e.target.value;
        axios.get(api).then(res=>{
            this.setState({
                customers : res.data
            });
        }).catch((err) => {
            if (err.response) {
            this.setState({
                errors: err.response.data.errors,
            });
            } else {
            Swal.fire({
                title: "Something went wrong!",
                icon: "error",
                text: "we loss connection to the database!",
                showCancelButton: false,
                showConfirmButton: false,
            });
            }
        });
    }else{
        this.setState({customers:[]});
    }
  };

  
  render() {
    const { customers } = this.state;
    const customerList = customers.map((customer) =>{
        return (
            <div className="row mt-3" key={customer.customer_id}>
              <div className="col-md-10 offset-md-1">
                <div className="list-group">
                  <div className="list-group-item">
                    <div className="row">
                      <div className="col px-4">
                        <div>
                          <div className="float-right">{moment(customer.created_at).format("MMM Do, YYYY [at] hh:mm")}</div>
                          <Link to={""+customer.customer_id}>
                            <h3>{customer.customer_first_name} {customer.customer_middle_name} {customer.customer_last_name}</h3>
                          </Link>
                          <p className="mb-0">
                            phone: {customer.customer_phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    });
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <h2 className="text-center display-4">Search Customer</h2>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <form>
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control form-control-lg"
                      placeholder="Type customer id here"
                      onChange={(e)=>{this.inputChangeHandler(e)}}
                    />
                  </div>
                </form>
              </div>
            </div>
            {this.state.customers.length ?
            (
                customerList
            ):
            (
                <center className="mt-5"><p>No data available...</p></center>
            )
            }
          </div>
        </section>
      </div>
    );
  }
}
export default AddNew;
