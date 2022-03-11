import moment from "moment";
import React from "react";

const Info = ({ userData }) => {
  return (
    <>
      <div className="active tab-pane" id="info">
        <dl className="row">
          <dt className="col-md-3">Admin ID:</dt>
          <dd className="col-md-9">{userData.admin_id}</dd>
          <dt className="col-md-3">Full Name:</dt>
          <dd className="col-md-9">
            {userData.admin_first_name} {userData.admin_last_name}
          </dd>
          <dt className="col-md-3">Phone Number:</dt>
          <dd className="col-md-9">{userData.admin_phone}</dd>
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
