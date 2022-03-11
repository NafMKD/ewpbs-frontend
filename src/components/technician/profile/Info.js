import moment from "moment";
import React from "react";

const Info = ({ userData }) => {
  return (
    <>
      <div className="active tab-pane" id="info">
        <dl className="row">
          <dt className="col-md-3">Employee ID:</dt>
          <dd className="col-md-9">{userData.sp_emp_id}</dd>
          <dt className="col-md-3">Full Name:</dt>
          <dd className="col-md-9">
            {userData.sp_emp_first_name} {userData.sp_emp_middle_name}
            {userData.sp_emp_last_name}
          </dd>
          <dt className="col-md-3">Phone:</dt>
          <dd className="col-md-9">{userData.sp_emp_phone}</dd>
          <dt className="col-md-3">Town:</dt>
          <dd className="col-md-9">{userData.sp_emp_town}</dd>
          <dt className="col-md-3">Region:</dt>
          <dd className="col-md-9">{userData.sp_emp_region}</dd>
          <dt className="col-md-3">House No.:</dt>
          <dd className="col-md-9">{userData.sp_emp_house_no}</dd>
          <dt className="col-md-3">Created At:</dt>
          <dd className="col-md-9">
            {moment(userData.created_at).format("MMM Do, YYYY [at] hh:mm")}
          </dd>
          <dt className="col-md-3">Last Update:</dt>
          <dd className="col-md-9">
            {moment(userData.updated_at).format("MMM Do, YYYY [at] hh:mm")}
          </dd>
        </dl>
      </div>
    </>
  );
};

export default Info;
