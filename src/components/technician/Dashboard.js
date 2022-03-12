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
  const [dashCount, setDashCount] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  if (!isLoaded) {
    const api =
      "http://127.0.0.1:8000/api/spemployee/dashboard/" +
      JSON.parse(localStorage.getItem("account_user")).sp_emp_id;
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
      bg: "bg-info",
      name: "Meter Records",
      count: dashCount,
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
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
