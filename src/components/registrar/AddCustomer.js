import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";

class Addcustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
    };
  }
  // validation
  validateStateInput = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["customer_first_name"]) {
      formIsValid = false;
      errors["customer_first_name"] = "Cannot be empty";
    } else if (typeof fields["customer_first_name"] !== "undefined") {
      if (!fields["customer_first_name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["customer_first_name"] = "Only letters";
      }
    }

    if (!fields["customer_middle_name"]) {
      formIsValid = false;
      errors["customer_middle_name"] = "Cannot be empty";
    } else if (typeof fields["customer_middle_name"] !== "undefined") {
      if (!fields["customer_middle_name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["customer_middle_name"] = "Only letters";
      }
    }

    if (!fields["customer_last_name"]) {
      formIsValid = false;
      errors["customer_last_name"] = "Cannot be empty";
    } else if (typeof fields["customer_last_name"] !== "undefined") {
      if (!fields["customer_last_name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["customer_last_name"] = "Only letters";
      }
    }

    if (!fields["customer_phone"]) {
      formIsValid = false;
      errors["customer_phone"] = "Cannot be empty";
    } else if (typeof fields["customer_phone"] !== "undefined") {
      if (isNaN(fields["customer_phone"])) {
        formIsValid = false;
        errors["customer_phone"] = "Only Numbers";
      }
    }

    if (!fields["customer_region"]) {
      formIsValid = false;
      errors["customer_region"] = "Cannot be empty";
    }

    if (!fields["customer_town"]) {
      formIsValid = false;
      errors["customer_town"] = "Cannot be empty";
    }

    if (!fields["customer_kebele"]) {
      formIsValid = false;
      errors["customer_kebele"] = "Cannot be empty";
    }

    if (!fields["customer_house_no"]) {
      formIsValid = false;
      errors["customer_house_no"] = "Cannot be empty";
    }

    if (!fields["customer_username"]) {
      formIsValid = false;
      errors["customer_username"] = "Cannot be empty";
    }

    if (!fields["customer_password"]) {
      formIsValid = false;
      errors["customer_password"] = "Cannot be empty";
    }

    if (!fields["customer_password_confirmation"]) {
      formIsValid = false;
      errors["customer_password_confirmation"] = "Cannot be empty";
    } else if (
      typeof fields["customer_password_confirmation"] !== "undefined"
    ) {
      if (
        fields["customer_password_confirmation"] !== fields["customer_password"]
      ) {
        formIsValid = false;
        errors["customer_password_confirmation"] = "Password didn't match";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };
  // handle when input changes it state
  inputHandler = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  // handle form submit
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
      const api = "http://127.0.0.1:8000/api/customer";
      axios
        .post(
          api,
          {
            customer_first_name: this.state.fields["customer_first_name"],
            customer_middle_name: this.state.fields["customer_middle_name"],
            customer_last_name: this.state.fields["customer_last_name"],
            customer_phone: this.state.fields["customer_phone"],
            customer_region: this.state.fields["customer_region"],
            customer_town: this.state.fields["customer_town"],
            customer_kebele: this.state.fields["customer_kebele"],
            customer_house_no: this.state.fields["customer_house_no"],
            customer_username: this.state.fields["customer_username"],
            customer_password: this.state.fields["customer_password"],
            customer_password_confirmation:
              this.state.fields["customer_password_confirmation"],
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("account_type", "customer");
          localStorage.setItem("account_user", JSON.stringify(res.data.data));
          Swal.close();
          Swal.fire({
            title: "Success!",
            html: "<i>Service Provider Successfuly Registerd!</i>",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
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
  render() {
    // select region options
    var regionOptions = [
      {
        value: "Addis Ababa",
        label: "Addis Ababa",
        target: { value: "Addis Ababa", name: "customer_region" },
      },
      {
        value: "Afar",
        label: "Afar",
        target: { value: "Afar", name: "customer_region" },
      },
      {
        value: "Amhara",
        label: "Amhara",
        target: { value: "Amhara", name: "customer_region" },
      },
      {
        value: "Benishagul",
        label: "Benishagul",
        target: { value: "Benishagul", name: "customer_region" },
      },
      {
        value: "Dere Dawa",
        label: "Dere Dawa",
        target: { value: "Dere Dawa", name: "customer_region" },
      },
      {
        value: "Gambela",
        label: "Gambela",
        target: { value: "Gambela", name: "customer_region" },
      },
      {
        value: "Harari",
        label: "Harari",
        target: { value: "Harari", name: "customer_region" },
      },
      {
        value: "Orormia",
        label: "Orormia",
        target: { value: "Orormia", name: "customer_region" },
      },
      {
        value: "SNNP",
        label: "SNNP",
        target: { value: "SNNP", name: "customer_region" },
      },
      {
        value: "Somali",
        label: "Somali",
        target: { value: "Somali", name: "customer_region" },
      },
      {
        value: "Tigrai",
        label: "Tigrai",
        target: { value: "Tigrai", name: "customer_region" },
      },
    ];

    // select form custom style
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        backgroundColor: "#343a40",
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        backgroundColor: "#343a40",
      }),
      control: (provided, state) => ({
        ...provided,
        backgroundColor: "#343a40",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: "white",
      }),
      menuList: (provided, state) => ({
        ...provided,
        color: "white",
      }),
    };
    return (
      <center>
        <div className="login-box mt-5">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <Link to="#" className="h1">
                <b>EWPBS</b>
              </Link>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign up as customer</p>
              <form
                onSubmit={(e) => {
                  this.submitForm(e);
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_first_name"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter First Name"
                    value={
                      this.state.fields["customer_first_name"]
                        ? this.state.fields["customer_first_name"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_first_name"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_first_name"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_middle_name"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter Middle Name"
                    value={
                      this.state.fields["customer_middle_name"]
                        ? this.state.fields["customer_middle_name"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_middle_name"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_middle_name"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_last_name"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter Last Name"
                    value={
                      this.state.fields["customer_last_name"]
                        ? this.state.fields["customer_last_name"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_last_name"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_last_name"]}
                  </span>
                </div>
                <div className="form-group">
                  <Select
                    options={regionOptions}
                    styles={customStyles}
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_region"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_phone"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter Phone"
                    value={
                      this.state.fields["customer_phone"]
                        ? this.state.fields["customer_phone"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_phone"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_phone"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_town"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter Town"
                    value={
                      this.state.fields["customer_town"]
                        ? this.state.fields["customer_town"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_town"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_town"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_kebele"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter Kebel"
                    value={
                      this.state.fields["customer_kebele"]
                        ? this.state.fields["customer_kebele"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_kebele"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_kebele"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_house_no"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter House No."
                    value={
                      this.state.fields["customer_house_no"]
                        ? this.state.fields["customer_house_no"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_house_no"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_house_no"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      this.state.errors["customer_username"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter username"
                    value={
                      this.state.fields["customer_username"]
                        ? this.state.fields["customer_username"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_username"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_username"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      this.state.errors["customer_password"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Enter password"
                    value={
                      this.state.fields["customer_password"]
                        ? this.state.fields["customer_password"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_password"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_password"]}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      this.state.errors["customer_password_confirmation"]
                        ? "form-control  is-invalid"
                        : "form-control"
                    }
                    placeholder="Confirm password"
                    value={
                      this.state.fields["customer_password_confirmation"]
                        ? this.state.fields["customer_password_confirmation"]
                        : ""
                    }
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    name="customer_password_confirmation"
                  />
                  <span className="text-danger">
                    {this.state.errors["customer_password_confirmation"]}
                  </span>
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0">
                <Link to="/" className="text-center">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </center>
    );
  }
}

export default Addcustomer;
