import moment from "moment";
import React from "react";

const Info = ({ userData }) => {
  return (
    <>
      <div className="active tab-pane" id="info">
        <dl className="row">
          <dt className="col-md-3">S.P. ID:</dt>
          <dd className="col-md-9">{userData.sp_id}</dd>
          <dt className="col-md-3">S.P. Name:</dt>
          <dd className="col-md-9">{userData.sp_name}</dd>
          <dt className="col-md-3">Region:</dt>
          <dd className="col-md-9">{userData.sp_region}</dd>
          <dt className="col-md-3">Town:</dt>
          <dd className="col-md-9">{userData.sp_town}</dd>
          <dt className="col-md-3">Zone:</dt>
          <dd className="col-md-9">{userData.sp_zone}</dd>
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
