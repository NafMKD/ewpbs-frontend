import React from "react";
import moment from "moment";

const Left = ({ userData }) => {
  return (
    <>
      <div className="col-md-3">
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center"></div>
            <h3 className="profile-username text-center">
              {userData.admin_first_name} {userData.admin_last_name}
            </h3>
            <p className="text-muted text-center">Administrator</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b>Last Login</b>{" "}
                <a className="float-right text-xs">
                  {moment(userData.admin_account.admin_last_login).format(
                    "MMM Do, YYYY [at] hh:mm"
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Left;
