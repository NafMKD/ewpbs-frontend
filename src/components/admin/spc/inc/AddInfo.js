import React from "react";

const AddInfo = (props) => {

  return (
    <div className="card card-outline card-primary">
      <div className="card-header">
        <h3 className="card-title">Service Provider C. Information:</h3>
      </div>
      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>S.P.C. Name:</label>
                <input
                  type="text"
                  className={props.state.errors['spc_name']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Name"
                  name="spc_name"
                  value={props.state.fields['spc_name']?props.state.fields['spc_name']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_name']}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="float-right btn btn-primary" onClick={(e)=>{props.changePageBtn(e,'f')}}>
            Next <i className="fas fa-arrow-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInfo;
