import React from "react";

const AddAccount = (props) => {
  return (
    <div className="card card-outline card-primary">
      <div className="card-header">
        <h3 className="card-title">Technician Account:</h3>
      </div>
      <form onSubmit={(e) => { props.submitFormBtn(e); }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <dl className="row mt-5 ml-1">
                <dt className="col-sm-5">Technician Name:</dt>
                <dd className="col-sm-7">{props.state.fields['sp_emp_first_name']} {props.state.fields['sp_emp_middle_name']} {props.state.fields['sp_emp_last_name']}</dd>
                <dt className="col-sm-4">Region:</dt>
                <dd className="col-sm-8">{props.state.fields['sp_emp_region']}</dd>
                <dt className="col-sm-4">Town:</dt>
                <dd className="col-sm-8">{props.state.fields['sp_emp_town']}</dd>
                <dt className="col-sm-4">House No.:</dt>
                <dd className="col-sm-8">{props.state.fields['sp_emp_house_no']}</dd>
                <dt className="col-sm-4">Phone:</dt>
                <dd className="col-sm-8">{props.state.fields['sp_emp_phone']}</dd>
              </dl>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className="form-group">
                <label>username:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_username']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['sp_emp_username']?props.state.fields['sp_emp_username']:""}
                  placeholder="Enter username"
                  name="sp_emp_username"
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_username']}</span>
              </div>
              <div className="form-group">
                <label>password:</label>
                <input
                  type="password"
                  className={props.state.errors['sp_emp_password']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['sp_emp_password']?props.state.fields['sp_emp_password']:""}
                  placeholder="Enter password"
                  name="sp_emp_password"
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_password']}</span>
              </div>
              <div className="form-group">
                <label>confirm password:</label>
                <input
                  type="password"
                  className={props.state.errors['sp_emp_password_confirmation']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['sp_emp_password_confirmation']?props.state.fields['sp_emp_password_confirmation']:""}
                  placeholder="confirm password"
                  name="sp_emp_password_confirmation"
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_password_confirmation']}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="float-left btn btn-primary"
            onClick={(e) => {
              props.changePageBtn(e);
            }}
          >
            <i className="fas fa-arrow-left mr-2" />
            Previous
          </button>
          <button
            className="float-right btn btn-success"
            type="submit"
          >
            <i className="fas fa-check mr-2" />
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;
