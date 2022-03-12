import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [amount, setAmount] = useState([]);
  const [dash, setDash] = useState([]);
  const thisMonth = [moment().format("M"), moment().format("[1] MMM, Y")];
  if (!isLoaded) {
    const api =
      "http://127.0.0.1:8000/api/customer/dashboard/" +
      JSON.parse(localStorage.getItem("account_user")).customer_id;
    axios
      .get(api)
      .then((res) => {
        Swal.close();
        setIsLoaded(true);
        setDash(res.data);
      })
      .catch((err) => {
        Swal.close();
        setIsLoaded(true);
        console.log(err);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          text: "we loss connection to the database!",
          showCancelButton: false,
          showConfirmButton: false,
        });
      });

    const api2 =
      "http://127.0.0.1:8000/api/customer/dashboard/bill/" +
      JSON.parse(localStorage.getItem("account_user")).customer_id +
      "/" +
      thisMonth[0];
    axios
      .get(api2)
      .then((res) => {
        setAmount(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      bg: "bg-info",
      name: "Active Bill",
      count: dash[1],
    },
    {
      class: "fa-check",
      bg: "bg-warning",
      name: "Paid Bill",
      count: dash[0],
    },
  ];
  const content = lists.map((list) => {
    return (
      <div className="col-12 col-sm-6 col-md-3" key={Math.random() * 100}>
        <div className="info-box">
          <span className={"info-box-icon elevation-1 " + list.bg}>
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
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body"></div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-sm-4 col-6">
                        <div className="description-block border-right">
                          <h5 className="description-header">
                            {(Math.round(amount[0] * 100) / 100).toFixed(2)} Br.
                          </h5>
                          <span className="description-text">TOTAL AMOUNT</span>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="description-block border-right">
                          <h5 className="description-header">
                            {amount[1]} Br.
                          </h5>
                          <span className="description-text">ACTIVE</span>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="description-block">
                          <h5 className="description-header">
                            {amount[2]} Br.
                          </h5>
                          <span className="description-text">PAID</span>
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
