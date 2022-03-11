import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// loding modal display
const loadingPage = () => {
  Swal.fire({
    width: "10%",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  Swal.showLoading();
  return <p>No data available...</p>;
};
const Dashboard = () => {
  const [dashCount, setDashCount] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    const api = "http://127.0.0.1:8000/api/dashboard/count/all";
    axios
      .get(api)
      .then((res) => {
        Swal.close();
        setIsLoaded(true);
        setDashCount(res.data);
      })
      .catch((err) => {
        setIsLoaded(true);
        console.log(err);
        Swal.close();
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          text: "we loss connection to the database!",
          showCancelButton: false,
          showConfirmButton: false,
        });
      });
  }
  const lists = [
    {
      class: "fa-cog",
      name: "Service Providers C.",
      count: dashCount[0],
    },
    { class: "fa-cog", name: "Service Providers", count: dashCount[1] },
    { class: "fa-cog", name: "Customers", count: dashCount[2] },
    { class: "fa-cog", name: "Technicians", count: dashCount[3] },
  ];
  const content = lists.map((list) => {
    return (
      <div className="col-12 col-sm-6 col-md-3" key={Math.random() * 100}>
        <div className="info-box">
          <span className="info-box-icon bg-info elevation-1">
            <i className={"fas " + list.class}> </i>
          </span>
          <div className="info-box-content">
            <span className="info-box-text"> {list.name} </span>
            <span className="info-box-number">{list.count}</span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0"> Dashboard </h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">{isLoaded ? content : loadingPage()}</div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Monthly Recap Report</h5>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-tool dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <i className="fas fa-wrench" />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          role="menu"
                        >
                          <a href="#" className="dropdown-item">
                            Action
                          </a>
                          <a href="#" className="dropdown-item">
                            Another action
                          </a>
                          <a href="#" className="dropdown-item">
                            Something else here
                          </a>
                          <a className="dropdown-divider" />
                          <a href="#" className="dropdown-item">
                            Separated link
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <p className="text-center">
                          <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                        </p>
                        <div className="chart">
                          <canvas
                            id="salesChart"
                            height={180}
                            style={{ height: 180 }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <p className="text-center">
                          <strong>Goal Completion</strong>
                        </p>
                        <div className="progress-group">
                          Add Products to Cart
                          <span className="float-right">
                            <b>160</b>/200
                          </span>
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: "80%" }}
                            />
                          </div>
                        </div>
                        <div className="progress-group">
                          Complete Purchase
                          <span className="float-right">
                            <b>310</b>/400
                          </span>
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-danger"
                              style={{ width: "75%" }}
                            />
                          </div>
                        </div>
                        <div className="progress-group">
                          <span className="progress-text">
                            Visit Premium Page
                          </span>
                          <span className="float-right">
                            <b>480</b>/800
                          </span>
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-success"
                              style={{ width: "60%" }}
                            />
                          </div>
                        </div>
                        <div className="progress-group">
                          Send Inquiries
                          <span className="float-right">
                            <b>250</b>/500
                          </span>
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-warning"
                              style={{ width: "50%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-sm-3 col-6">
                        <div className="description-block border-right">
                          <span className="description-percentage text-success">
                            <i className="fas fa-caret-up" /> 17%
                          </span>
                          <h5 className="description-header">$35,210.43</h5>
                          <span className="description-text">
                            TOTAL REVENUE
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="description-block border-right">
                          <span className="description-percentage text-warning">
                            <i className="fas fa-caret-left" /> 0%
                          </span>
                          <h5 className="description-header">$10,390.90</h5>
                          <span className="description-text">TOTAL COST</span>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="description-block border-right">
                          <span className="description-percentage text-success">
                            <i className="fas fa-caret-up" /> 20%
                          </span>
                          <h5 className="description-header">$24,813.53</h5>
                          <span className="description-text">TOTAL PROFIT</span>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="description-block">
                          <span className="description-percentage text-danger">
                            <i className="fas fa-caret-down" /> 18%
                          </span>
                          <h5 className="description-header">1200</h5>
                          <span className="description-text">
                            GOAL COMPLETIONS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
