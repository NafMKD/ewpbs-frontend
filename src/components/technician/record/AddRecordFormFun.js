import React from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const AddRecordFormFun = (props) => {
  let navigate = useNavigate();
  if (props.state.redirectToView) navigate("/technician/record/addnew");
  return (
    <form
      onSubmit={(e) => {
        props.submitForm(e);
      }}
    >
      <div className="card-body">
        <dl className="row">
          <dt className="col-md-2">Customer Full Name:</dt>
          <dl className="col-md-10">
            {props.state.customer.data.customer_first_name}{" "}
            {props.state.customer.data.customer_middle_name}{" "}
            {props.state.customer.data.customer_last_name}
          </dl>
        </dl>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <label>Reading Month For:</label>
              <DatePicker
                dateFormat="yyyy-MM-01"
                selected={props.state.fields["meter_reading_month_year"]}
                onChange={(e) => {
                  props.inputHandler(e, "meter_reading_month_year");
                }}
              />
              <span className="text-danger">
                {props.state.errors["meter_reading_month_year"]}
              </span>
            </div>
            <div className="form-group">
              <label>Reading Date:</label>
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={props.state.fields["meter_reading_date"]}
                onChange={(e) => {
                  props.inputHandler(e, "meter_reading_date");
                }}
              />
              <span className="text-danger">
                {props.state.errors["meter_reading_date"]}
              </span>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="form-group">
              <label>Meter Reading:</label>
              <input
                type="text"
                className={
                  props.state.errors["meter_reading"]
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                value={
                  props.state.fields["meter_reading"]
                    ? props.state.fields["meter_reading"]
                    : ""
                }
                placeholder="Enter Reading"
                name="meter_reading"
                onChange={(e) => {
                  props.inputHandler(e, 1);
                }}
              />
              <span className="text-danger">
                {props.state.errors["meter_reading"]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button type="submit" className="btn btn-success float-right">
          <i className="fas fa-check mr-2" /> Register
        </button>
      </div>
    </form>
  );
};

export default AddRecordFormFun;
