import React, { Component } from 'react'
import DataTable, {createTheme} from 'react-data-table-component'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment';

class CalculatedList extends Component {
    // constractor
    constructor(props){
        super(props);
        this.state = {
            records : {},
            isLoaded : false
        }
    }
    // fetching data when it mounts
    componentDidMount(){
        const api = "http://127.0.0.1:8000/api/meterrecord/spcalculated/1"
        axios.get(api).then(res => {
            this.setState({
                records : res.data,
                isLoaded : true
            })
        }).catch(err =>{
            this.setState({
              isLoaded : true
            })
            console.log(err);
            Swal.close();
            Swal.fire({
                title: 'Something went wrong!',
                icon: 'error',
                text: 'we loss connection to the database!',
                showCancelButton: false,
                showConfirmButton: false
            })
        });
    };

    // loding modal display
    loadingPage = () =>{
        Swal.fire({
            width:'10%',
            allowOutsideClick:false,
            allowEscapeKey:false,
            allowEnterKey:false
        });
        Swal.showLoading();
        return <p>No data available...</p>
    }

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
        selector: (row) => row.meter_record_id,
        sortable: true,
      },
      {
        name: "Customer Name",
        selector: (row) => row.customer_first_name +" "+row.customer_middle_name +" "+row.customer_last_name,
        sortable: true,
      },
      {
        name: "Meter Reading",
        selector: (row) => row.meter_reading,
        sortable: true,
      },
      {
        name: "Reading Month",
        selector: (row) => moment(row.meter_reading_month_year).format("MM/YYYY"),
        sortable: true,
      },
      {
        name: "Reading date",
        selector: (row) => moment(row.meter_reading_date).format("DD-MM-YYYY"),
        sortable: true,
      }
    ];
    return (
      <DataTable
        title="List of Record"
        columns={columns}
        data={this.state.records}
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
                    <h1 className="m-0">Record List</h1>
                    </div>
                </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Calculated Record List:</h3>
                        </div>
                        <div className="card-body">
                            <br/>
                            {this.state.isLoaded ?  this.dataPage()  : this.loadingPage()}
                        </div>
                    </div>                      
                </div>
            </section>
            </div>
        )
    }
}
export default CalculatedList;
