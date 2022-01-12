import React from "react";
import Select from "react-select";

const AddInfo = (props) => {
  // select region options
  var regionOptions = [
    {
      value: "Addis Ababa",
      label: "Addis Ababa",
      target: { value: "Addis Ababa", name: "sp_region" },
    },
    {
      value: "Afar",
      label: "Afar",
      target: { value: "Afar", name: "sp_region" },
    },
    {
      value: "Amhara",
      label: "Amhara",
      target: { value: "Amhara", name: "sp_region" },
    },
    {
      value: "Benishagul",
      label: "Benishagul",
      target: { value: "Benishagul", name: "sp_region" },
    },
    {
      value: "Dere Dawa",
      label: "Dere Dawa",
      target: { value: "Dere Dawa", name: "sp_region" },
    },
    {
      value: "Gambela",
      label: "Gambela",
      target: { value: "Gambela", name: "sp_region" },
    },
    {
      value: "Harari",
      label: "Harari",
      target: { value: "Harari", name: "sp_region" },
    },
    {
      value: "Orormia",
      label: "Orormia",
      target: { value: "Orormia", name: "sp_region" },
    },
    {
      value: "SNNP",
      label: "SNNP",
      target: { value: "SNNP", name: "sp_region" },
    },
    {
      value: "Somali",
      label: "Somali",
      target: { value: "Somali", name: "sp_region" },
    },
    {
      value: "Tigrai",
      label: "Tigrai",
      target: { value: "Tigrai", name: "sp_region" },
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
        <h3 className="card-title">Service Provider Information:</h3>
      </div>
      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>S.P. Name:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_name']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter Name"
                  name="sp_name"
                  value={props.state.fields['sp_name']?props.state.fields['sp_name']:""}
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_name']}</span>
              </div>

              <div className="form-group">
                <label>Region:</label>
                <Select options={regionOptions} styles={customStyles} onChange={(e)=>{props.inputHandler(e)}} />
                <span className="text-danger">{props.state.errors['sp_region']}</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Town:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_town']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter town"
                  name="sp_town"
                  value={props.state.fields['sp_town']?props.state.fields['sp_town']:""}
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_town']}</span>
              </div>

              <div className="form-group">
                <label>Zone:</label>
                <input
                  type="text"
                  className={props.state.errors['sp_zone']?"form-control  is-invalid":"form-control"}
                  placeholder="Enter zone"
                  name="sp_zone"
                  value={props.state.fields['sp_zone']?props.state.fields['sp_zone']:""}
                  onChange={(e)=>{props.inputHandler(e)}}
                />
                <span className="text-danger">{props.state.errors['sp_zone']}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="float-right btn btn-primary" onClick={(e)=>{props.changePageBtn(e, 'f')}}>
            Next <i className="fas fa-arrow-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInfo;
