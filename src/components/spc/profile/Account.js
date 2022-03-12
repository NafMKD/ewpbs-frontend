import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      account_user: this.props.userData,
    };
  }

  // handle input change
  inputChangeHandler = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  submitFormData = (e) => {
    e.preventDefault();
    let fields = this.state.fields;
    if (Object.keys(fields).length !== 0) {
      Swal.fire({
        width: "10%",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      Swal.showLoading();

      const api =
        "http://127.0.0.1:8000/api/spc/spc_account/" +
        this.state.account_user.spc_id;
      axios
        .put(api, JSON.stringify(fields), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          Swal.close();
          Swal.fire({
            title: "Success!",
            html: "<i>Account Updated!</i>",
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
    return (
      <>
        <div className="tab-pane" id="account">
          <div className="row">
            <div className="col-md-8">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">User Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="user name"
                    name="spc_username"
                    onChange={(e) => {
                      this.inputChangeHandler(e);
                    }}
                  />
                  <span className="text-danger">
                    {this.state.errors["spc_username"]}
                  </span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Old Password</label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Old Password"
                    name="old_spc_password"
                    onChange={(e) => {
                      this.inputChangeHandler(e);
                    }}
                  />
                  <span className="text-danger">
                    {this.state.errors["old_spc_password"]}
                  </span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">New Password</label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="spc_password"
                    onChange={(e) => {
                      this.inputChangeHandler(e);
                    }}
                  />
                  <span className="text-danger">
                    {this.state.errors["spc_password"]}
                  </span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Confirm New Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="spc_password_confirmation"
                    onChange={(e) => {
                      this.inputChangeHandler(e);
                    }}
                  />
                  <span className="text-danger">
                    {this.state.errors["spc_password_confirmation"]}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={(e) => this.submitFormData(e)}
                className="btn btn-success float-right"
              >
                <i className="fas fa-check mr-2"></i>
                change
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Account;
