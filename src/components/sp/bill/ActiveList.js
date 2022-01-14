import React, { Component } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

class ActiveList extends Component {
  // constractor
  constructor(props) {
    super(props);
    this.state = {
      bill: {},
      isLoaded: false,
      account_user : {}
    };
  }
  // fetching data when it mounts
  componentDidMount() {
    const account_user = JSON.parse(localStorage.getItem('account_user'));
    this.setState({
      account_user
    });
    const api = "http://127.0.0.1:8000/api/activebill/sp/"+account_user.sp_id;
    axios
      .get(api)
      .then((res) => {
        this.setState({
          bill: res.data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
        });
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

  // loding modal display
  loadingPage = () => {
    Swal.fire({
      width: "10%",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    Swal.showLoading();
    return <p>No data available...</p>;
  };

  // data table diaplay
  dataPage = () => {
    Swal.close();
    const customStyles = {
      header: {
        style: {
          minHeight: "56px",
        },
      },
      headRow: {
        style: {
          borderTopStyle: "solid",
          borderTopWidth: "1px",
          borderTopColor: "white",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "white",
        },
      },
      headCells: {
        style: {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "white",
          borderLeftStyle: "solid",
          borderLeftWidth: "1px",
          borderLeftColor: "white",
        },
      },
      cells: {
        style: {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "white",
          borderLeftStyle: "solid",
          borderLeftWidth: "1px",
          borderLeftColor: "white",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "white",
        },
      },
    };
    createTheme("solarized", {
      text: {
        primary: "white",
        secondary: "white",
      },
      background: {
        default: "#343a40",
      },
    });
    const columns = [
      {
        name: "id",
        selector: (row) => row.ac_bill_id,
        sortable: true,
      },
      {
        name: "Customer Name",
        selector: (row) =>
          row.customer_first_name +
          " " +
          row.customer_middle_name +
          " " +
          row.customer_last_name,
        sortable: true,
      },
      {
        name: "Previous Meter Reading",
        selector: (row) => row.ac_meter_reading_previous,
        sortable: true,
      },
      {
        name: "Cusrrent Meter Reading",
        selector: (row) => row.ac_meter_reading,
        sortable: true,
      },
      {
        name: "Tarif",
        selector: (row) => row.ac_meter_reading_tarif,
        sortable: true,
      },
      {
        name: "Amount(Br.)",
        selector: (row) => row.ac_amount_birr,
        sortable: true,
      },
      {
        name: "Reading Month",
        selector: (row) => moment(row.ac_month_year).format("MM/YYYY"),
        sortable: true,
      },
    ];
    return (
      <DataTable
        title="List of Bills"
        columns={columns}
        data={this.state.bill}
        customStyles={customStyles}
        theme="solarized"
        pagination
      />
    );
  };
  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Bill List</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-outline card-primary">
              <div className="card-header">
                <h3 className="card-title">Active Bill List:</h3>
              </div>
              <div className="card-body">
                <br />
                {this.state.isLoaded ? this.dataPage() : this.loadingPage()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default ActiveList;
