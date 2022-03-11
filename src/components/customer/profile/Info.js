import moment from "moment";
import React from "react";

const Info = ({ userData }) => {
  return (
    <>
      <div className="active tab-pane" id="info">
        <dl className="row">
          <dt className="col-md-3">Customer ID:</dt>
          <dd className="col-md-9">{userData.customer_id}</dd>
          <dt className="col-md-3">Full Name:</dt>
          <dd className="col-md-9">
            {userData.customer_first_name} {userData.customer_middle_name}{" "}
            {userData.customer_last_name}
          </dd>
          <dt className="col-md-3">Phone Number:</dt>
          <dd className="col-md-9">{userData.customer_phone}</dd>
          <dt className="col-md-3">house No.:</dt>
          <dd className="col-md-9">{userData.customer_house_no}</dd>
          <dt className="col-md-3">Town:</dt>
          <dd className="col-md-9">{userData.customer_town}</dd>
          <dt className="col-md-3">Kebele:</dt>
          <dd className="col-md-9">{userData.customer_kebele}</dd>
          <dt className="col-md-3">Region:</dt>
          <dd className="col-md-9">{userData.customer_region}</dd>
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
