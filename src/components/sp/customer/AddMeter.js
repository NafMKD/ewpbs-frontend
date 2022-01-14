import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { geolocated } from "react-geolocated";

class Addmeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      customer_id: this.props.customer_id,
      fields: {},
      errors: {},
      isLoaded: false,
      account_user : {}
    };
  }

  componentDidMount() {
    const account_user = JSON.parse(localStorage.getItem('account_user')); 
    this.setState({
      account_user
    });
    const api = "http://127.0.0.1:8000/api/customer/" + this.state.customer_id;
    axios
      .get(api)
      .then((res) => {
        this.setState({
          customer: res.data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
        });
        console.error(err);
      });
  }
  // validation
  validateStateInput = () => {
    let fields = this.state.fields;
    let errors = {};
    let isValid = true;
    if (!fields["meter_longitude"] || fields["meter_longitude"] === null) {
      errors["meter_longitude"] = "cannot be empty!";
      isValid = false;
    } else if (typeof fields["meter_longitude"] !== "undefined") {
      if (isNaN(fields["meter_longitude"])) {
        isValid = false;
        errors["meter_longitude"] = "Only Numbers allowed";
      }
    }

    if (!fields["meter_latitude"] || fields["meter_latitude"] === null) {
      errors["meter_latitude"] = "cannot be empty!";
      isValid = false;
    } else if (typeof fields["meter_latitude"] !== "undefined") {
      if (isNaN(fields["meter_latitude"])) {
        isValid = false;
        errors["meter_latitude"] = "Only Numbers allowed";
      }
    }

    if (!fields["meter_serial"] || fields["meter_serial"] === null) {
      errors["meter_serial"] = "cannot be empty!";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };
  // input change handler
  inputHandler = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };
  // submit forma handler
  submitForm = (e) => {
    e.preventDefault();
    if (this.validateStateInput()) {
      Swal.fire({
        width: "10%",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      Swal.showLoading();
      const api = "http://127.0.0.1:8000/api/customersprelation/";
      const api2 = "http://127.0.0.1:8000/api/sp/meter/";
      
      axios
        .post(
          api,
          {
            customer_id: this.state.customer_id,
            sp_id: this.state.account_user.sp_id,
            status: 1,
          },
          {
            headers: {
              'Accept': "application/json",
            },
          }
        )
        .then((res) => {
          axios
            .post(
              api2,
              {
                customer_id: this.state.customer_id,
                sp_id: this.state.account_user.sp_id,
                meter_serial: this.state.fields["meter_serial"],
                meter_latitude: this.state.fields["meter_latitude"],
                meter_longitude: this.state.fields["meter_longitude"],
              },
              {
                headers: {
                  'Accept': "application/json",
                },
              }
            )
            .then((res) => {
              Swal.close();
              Swal.fire({
                title: "Success!",
                html: "<i>Customer Successfuly Registerd!</i>",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: true,
              });
            })
            .catch((err2) => {
              Swal.close();
              if (err2.response) {
                this.setState({
                  errors: err2.response.data.errors,
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
        })
        .catch((err) => {
          Swal.close();
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
    }
  };
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

  //getLocation
  getLocation = (e) => {
    let lat = this.props.coords.latitude;
    let long = this.props.coords.longitude;
    Swal.fire({
      title: "Your Location",
      html: "<b>Latitude : </b> " + lat + "<br/><b>Longitude : </b> " + long,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Fill input",
    }).then((result) => {
      if (result.isConfirmed) {
        let fields = this.state.fields;
        fields["meter_longitude"] = this.props.coords.longitude;
        fields["meter_latitude"] = this.props.coords.latitude;
        this.setState({
          fields,
        });
        Swal.close();
      }
    });
  };

  render() {
    if (this.state.isLoaded) Swal.close();
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Add Meter</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-outline card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  Add Meter: (<em>Locations are in Decimal Degrees format</em>)
                </h3>
                <div className="card-tools mr-5">
                  <button
                    className="btn btn-tool"
                    onClick={(e) => {
                      this.getLocation();
                    }}
                  >
                    <i className="fas fa-map-marker-alt fa-2x" />
                  </button>
                </div>
              </div>
              {this.state.isLoaded ? (
                Object.keys(this.state.customer).length ? (
                  <form
                    onSubmit={(e) => {
                      this.submitForm(e);
                    }}
                  >
                    <div className="card-body">
                      <dl className="row">
                        <dt className="col-md-2">Customer Full Name:</dt>
                        <dl className="col-md-10">
                          {this.state.customer.data.customer_first_name}{" "}
                          {this.state.customer.data.customer_middle_name}{" "}
                          {this.state.customer.data.customer_last_name}
                        </dl>
                      </dl>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Meter Location (Longitude):</label>
                            <input
                              type="text"
                              className={
                                this.state.errors["meter_longitude"]
                                  ? "form-control  is-invalid"
                                  : "form-control"
                              }
                              value={
                                this.state.fields["meter_longitude"]
                                  ? this.state.fields["meter_longitude"]
                                  : ""
                              }
                              placeholder="Enter Longitude"
                              name="meter_longitude"
                              onChange={(e) => {
                                this.inputHandler(e);
                              }}
                            />
                            <span className="text-danger">
                              {this.state.errors["meter_longitude"]}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Meter Serial Number:</label>
                            <input
                              type="text"
                              className={
                                this.state.errors["meter_serial"]
                                  ? "form-control  is-invalid"
                                  : "form-control"
                              }
                              value={
                                this.state.fields["meter_serial"]
                                  ? this.state.fields["meter_serial"]
                                  : ""
                              }
                              placeholder="Enter Serial Number"
                              name="meter_serial"
                              onChange={(e) => {
                                this.inputHandler(e);
                              }}
                            />
                            <span className="text-danger">
                              {this.state.errors["meter_serial"]}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Meter Location (Latitude):</label>
                            <input
                              type="text"
                              className={
                                this.state.errors["meter_latitude"]
                                  ? "form-control  is-invalid"
                                  : "form-control"
                              }
                              value={
                                this.state.fields["meter_latitude"]
                                  ? this.state.fields["meter_latitude"]
                                  : ""
                              }
                              placeholder="Enter Latitude"
                              name="meter_latitude"
                              onChange={(e) => {
                                this.inputHandler(e);
                              }}
                            />
                            <span className="text-danger">
                              {this.state.errors["meter_latitude"]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-success float-right"
                      >
                        <i className="fas fa-check mr-2" /> Register
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>No data found</div>
                )
              ) : (
                this.loadingPage()
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default geolocated()(Addmeter);
