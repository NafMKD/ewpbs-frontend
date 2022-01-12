import React from "react";

const AddInfo = (props) => {

  return (
    <div className="card card-outline card-primary">
      <div className="card-header">
        <h3 className="card-title">Service Provider Information:</h3>
      </div>
      <form onSubmit={(e)=>{props.submitForm(e)}}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="text"
                  className={props.state.errors['spc_tarif_amount']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Amount"
                  name="spc_tarif_amount"
                  value={props.state.fields['spc_tarif_amount']?props.state.fields['spc_tarif_amount']:""}
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_tarif_amount']}</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Min Reading:</label>
                <input
                  type="text"
                  className={props.state.errors['spc_tarif_meter_min']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter min reading"
                  name="spc_tarif_meter_min"
                  value={props.state.fields['spc_tarif_meter_min']?props.state.fields['spc_tarif_meter_min']:""}
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_tarif_meter_min']}</span>
              </div>

              <div className="form-group">
                <label>Max Reading:</label>
                <input
                  type="text"
                  className={props.state.errors['spc_tarif_meter_max']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter max reading"
                  name="spc_tarif_meter_max"
                  value={props.state.fields['spc_tarif_meter_max']?props.state.fields['spc_tarif_meter_max']:""}
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['spc_tarif_meter_max']}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="float-right btn btn-success" onClick={(e)=>{props.changePageBtn(e, 'f')}}>
            <i className="fas fa-check mr-2" /> Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInfo;
