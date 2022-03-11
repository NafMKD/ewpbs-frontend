import React from "react";
import Account from "./Account";
import Info from "./Info";
function Right({ userData }) {
  return (
    <>
      <div className="col-md-9">
        <div className="card">
          <div className="card-header p-2">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link active" href="#info" data-toggle="tab">
                  Information
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#account" data-toggle="tab">
                  Account
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <Info userData={userData} />
              <Account userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Right;
