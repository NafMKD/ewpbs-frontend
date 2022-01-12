import React from "react";

const AddAccount = (props) => {
  return (
    <div className="card card-outline card-primary">
      <div className="card-header">
        <h3 className="card-title">Service Provider C. Account:</h3>
      </div>
      <form onSubmit={(e) => { props.submitFormBtn(e); }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <dl className="row mt-5 ml-4">
                <dt className="col-sm-4">S.P.C. Name:</dt>
                <dd className="col-sm-8">{props.state.fields['spc_name']}</dd>
              </dl>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className="form-group">
                <label>username:</label>
                <input
                  type="text"
                  className={props.state.errors['spc_username']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['spc_username']?props.state.fields['spc_username']:""}
                  placeholder="Enter username"
                  name="spc_username"
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_username']}</span>
              </div>
              <div className="form-group">
                <label>password:</label>
                <input
                  type="password"
                  className={props.state.errors['spc_password']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['spc_password']?props.state.fields['spc_password']:""}
                  placeholder="Enter password"
                  name="spc_password"
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_password']}</span>
              </div>
              <div className="form-group">
                <label>confirm password:</label>
                <input
                  type="password"
                  className={props.state.errors['spc_password_confirmation']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['spc_password_confirmation']?props.state.fields['spc_password_confirmation']:""}
                  placeholder="confirm password"
                  name="spc_password_confirmation"
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_password_confirmation']}</span>
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
