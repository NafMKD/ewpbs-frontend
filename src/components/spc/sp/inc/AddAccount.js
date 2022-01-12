import React from "react";

const AddAccount = (props) => {
  return (
    <div className="card card-outline card-primary">
      <div className="card-header">
        <h3 className="card-title">Service Provider Account:</h3>
      </div>
      <form onSubmit={(e)=>{props.submitForm(e)}}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <dl className="row mt-5 ml-4">
                <dt className="col-sm-4">S.P. Name:</dt>
                <dd className="col-sm-8">{props.state.fields["sp_name"]}</dd>
                <dt className="col-sm-4">S.P. Region:</dt>
                <dd className="col-sm-8">{props.state.fields["sp_region"]}</dd>
                <dt className="col-sm-4">S.P. Town:</dt>
                <dd className="col-sm-8">{props.state.fields["sp_town"]}</dd>
                <dt className="col-sm-4">S.P. Zone:</dt>
                <dd className="col-sm-8">{props.state.fields["sp_zone"]}</dd>
              </dl>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className="form-group">
                <label>username:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_username']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['sp_username']?props.state.fields['sp_username']:""}
                  placeholder="Enter username"
                  name="sp_username"
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_username']}</span>
              </div>
              <div className="form-group">
                <label>password:</label>
                <input
                  type="password"
                  className={props.state.errors['sp_password']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['sp_password']?props.state.fields['sp_password']:""}
                  placeholder="Enter password"
                  name="sp_password"
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_password']}</span>
              </div>
              <div className="form-group">
                <label>confirm password:</label>
                <input
                  type="password"
                  className={props.state.errors['sp_password_confirmation']?"form-control  is-invalid":"form-control"}
                  value={props.state.fields['sp_password_confirmation']?props.state.fields['sp_password_confirmation']:""}
                  placeholder="confirm password"
                  name="sp_password_confirmation"
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_password_confirmation']}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="float-left btn btn-primary"
            onClick={(e) => {
              props.changePageBtn(e, 'f');
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
