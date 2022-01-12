import React from "react";
import Select from "react-select";

const AddInfo = (props) => {
  // select region options
  var regionOptions = [
    {
      value: "Addis Ababa",
      label: "Addis Ababa",
      target: { value: "Addis Ababa", name: "sp_emp_region" },
    },
    {
      value: "Afar",
      label: "Afar",
      target: { value: "Afar", name: "sp_emp_region" },
    },
    {
      value: "Amhara",
      label: "Amhara",
      target: { value: "Amhara", name: "sp_emp_region" },
    },
    {
      value: "Benishagul",
      label: "Benishagul",
      target: { value: "Benishagul", name: "sp_emp_region" },
    },
    {
      value: "Dere Dawa",
      label: "Dere Dawa",
      target: { value: "Dere Dawa", name: "sp_emp_region" },
    },
    {
      value: "Gambela",
      label: "Gambela",
      target: { value: "Gambela", name: "sp_emp_region" },
    },
    {
      value: "Harari",
      label: "Harari",
      target: { value: "Harari", name: "sp_emp_region" },
    },
    {
      value: "Orormia",
      label: "Orormia",
      target: { value: "Orormia", name: "sp_emp_region" },
    },
    {
      value: "SNNP",
      label: "SNNP",
      target: { value: "SNNP", name: "sp_emp_region" },
    },
    {
      value: "Somali",
      label: "Somali",
      target: { value: "Somali", name: "sp_emp_region" },
    },
    {
      value: "Tigrai",
      label: "Tigrai",
      target: { value: "Tigrai", name: "sp_emp_region" },
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
    <div className="card card-outline card-primary">
      <div className="card-header">
        <h3 className="card-title">Technician Information:</h3>
      </div>
      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_first_name']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter First Name"
                  name="sp_emp_first_name"
                  value={props.state.fields['sp_emp_first_name']?props.state.fields['sp_emp_first_name']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_first_name']}</span>
              </div>
              <div className="form-group">
                <label>Town:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_town']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Town"
                  name="sp_emp_town"
                  value={props.state.fields['sp_emp_town']?props.state.fields['sp_emp_town']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_town']}</span>
              </div>
              <div className="form-group">
                <label>Region:</label>
                <Select options={regionOptions} styles={customStyles} onChange={(e)=>{props.inputChangeHandler(e)}} />
                <span className="text-danger">{props.state.errors['sp_emp_region']}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Middle Name:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_middle_name']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Middle Name"
                  name="sp_emp_middle_name"
                  value={props.state.fields['sp_emp_middle_name']?props.state.fields['sp_emp_middle_name']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_middle_name']}</span>
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_phone']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Phone"
                  name="sp_emp_phone"
                  value={props.state.fields['sp_emp_phone']?props.state.fields['sp_emp_phone']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_phone']}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_last_name']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Last Name"
                  name="sp_emp_last_name"
                  value={props.state.fields['sp_emp_last_name']?props.state.fields['sp_emp_last_name']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_last_name']}</span>
              </div>
              <div className="form-group">
                <label>House No.:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_emp_house_no']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter House No."
                  name="sp_emp_house_no"
                  value={props.state.fields['sp_emp_house_no']?props.state.fields['sp_emp_house_no']:""}
                  onChange={(e) => {props.inputChangeHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_emp_house_no']}</span>
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
