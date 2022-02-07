import React, { Component } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import moment from "moment";

class Paybill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billDetail : {},
            isLoaded : false,
            account_user: {},
            spInformation : {},
            sp_id : this.props.sp_id,
            bill_id : this.props.bill_id,
            totalServiceFee : 0
        }
    }

    componentDidMount(){
      const account_user = JSON.parse(localStorage.getItem('account_user'));
      this.setState({
        account_user
      });
        let api = "http://127.0.0.1:8000/api/sp/"+this.state.sp_id;
        let api2 = "http://127.0.0.1:8000/api/activebill/"+this.state.bill_id;
        axios.get(api).then(res =>{
            this.setState({
                spInformation : res.data.data
            });
            axios.get(api2).then(res2=>{
                this.setState({
                    billDetail : res2.data,
                    isLoaded : true
                });
            }).catch(err2 =>{
                
            });
        }).catch(err=>{
            console.log(err);
          this.setState({
            isLoaded : true
          });
        });
    }

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


    payBill = (e) =>{
        e.preventDefault();
        Swal.fire({
            width:'10%',
            allowOutsideClick:false,
            allowEscapeKey:false,
            allowEnterKey:false
        });
        Swal.showLoading();
        const api = "http://127.0.0.1:8000/api/paybill/"+this.state.bill_id;
        axios.post(api,{
            'hs_paid_amount' : parseFloat(this.state.billDetail.ac_amount_birr) + this.state.totalServiceFee,
            'hs_paid_date' : moment(new Date()).format("YYYY-MM-DD")
        },{
            headers:{
                'Accept':'application/json'
            }
        }).then(res =>{
            Swal.close();
            Swal.fire({
                title: 'Success!',
                html: '<i>Bill Payed Successfuly!</i>',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false
            })
        }).catch(err =>{
            Swal.close();
            Swal.fire({
                title: 'Something went wrong!',
                icon: 'error',
                text: 'we loss connection to the database!',
                showCancelButton: false,
                showConfirmButton: false
            })
        });
    }
    
  render() {
    let totalFee=null;
    let usageKW = 0;
    if(this.state.isLoaded){
      usageKW = (this.state.billDetail.ac_meter_reading) - (this.state.billDetail.ac_meter_reading_previous);
      if(parseFloat(usageKW)>0 && parseFloat(usageKW)<=25){
        this.state.totalServiceFee = 1.40;
      }else if(parseFloat(usageKW)>=26 && parseFloat(usageKW)<=50){
        this.state.totalServiceFee = 3.40;
      }else if(parseFloat(usageKW)>=51 && parseFloat(usageKW)<=105){
        this.state.totalServiceFee = 6.82;
      }else if(parseFloat(usageKW)>=106 && parseFloat(usageKW)<=300){
        this.state.totalServiceFee = 10.24;
      }else if(parseFloat(usageKW)>300){
        this.state.totalServiceFee = 13.65;
      }else{
        this.state.totalServiceFee = 0;
      }
      totalFee = parseFloat(this.state.billDetail.ac_amount_birr) + this.state.totalServiceFee;
      Swal.close();
    }
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
            {this.state.isLoaded ?(
            <div className="row">
              <div className="col-md-12">
                <div className="invoice p-3 mb-3">
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-globe" /> {this.state.spInformation.sp_name}
                        <small className="float-right">Date: {moment(this.state.billDetail.created_at).format("D/MM/YYYY")}</small>
                      </h4>
                    </div>
                  </div>
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      From
                      <address>
                        <strong>{this.state.spInformation.sp_name}</strong>
                        <br />
                        {this.state.spInformation.sp_region}, {this.state.spInformation.sp_zone}
                        <br />
                        {this.state.spInformation.sp_town}
                      </address>
                    </div>
                    <div className="col-sm-4 invoice-col">
                      To
                      <address>
                        <strong>{this.state.account_user.customer_first_name} {this.state.account_user.customer_middle_name} {this.state.account_user.customer_last_name}</strong>
                        <br />
                        {this.state.account_user.customer_region}, {this.state.account_user.customer_town}
                        <br />
                        {this.state.account_user.customer_house_no}
                        <br />
                        {this.state.account_user.customer_phone}
                      </address>
                    </div>
                    <div className="col-sm-4 invoice-col">
                      <b>Invoice #A{this.state.bill_id}</b>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Customer Name</th>
                            <th>Bill Month </th>
                            <th>Previos Reading</th>
                            <th>Current Reading</th>
                            <th>Usage</th>
                            <th>Tarif</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{this.state.account_user.customer_first_name} {this.state.account_user.customer_middle_name} {this.state.account_user.customer_last_name}</td>
                            <td>{moment(this.state.billDetail.ac_month_year).format("MM/YYYY")}</td>
                            <td>{this.state.billDetail.ac_meter_reading_previous}</td>
                            <td>{this.state.billDetail.ac_meter_reading}</td>
                            <td>{usageKW}</td>
                            <td>{this.state.billDetail.ac_meter_reading_tarif}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      
                      
                    </div>
                    <div className="col-6">
                      <p className="lead">Amount Due {moment(new Date()).format("D/MM/YYYY")}</p>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th style={{ width: "50%" }}>Subtotal:</th>
                              <td>{this.state.billDetail.ac_amount_birr}</td>
                            </tr>
                            <tr>
                              <th>Service Fee </th>
                              <td>{this.state.totalServiceFee}</td>
                            </tr>
                            <tr>
                              <th>Total:</th>
                              <td>{totalFee}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row no-print">
                    <div className="col-12">
                      <a
                        href="invoice-print.html"
                        rel="noopener"
                        target="_blank"
                        className="btn btn-default"
                        onClick={(e)=>{window.print()}}
                      >
                        <i className="fas fa-print" /> Print
                      </a>
                      <button
                        type="button"
                        className="btn btn-success float-right"
                        onClick={(e)=>{this.payBill(e)}}
                      >
                        <i className="far fa-credit-card" /> Submit Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
            : this.loadingPage() }
          </div>
        </section>
      </div>
    );
  }
}

export default Paybill;
