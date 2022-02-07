import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { geolocated } from "react-geolocated";
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";
import AddRecordFormFun from "./AddRecordFormFun"

class Addrecordform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meter_id: this.props.meter_id,
      meter: {},
      fields: {
        'meter_reading_month_year' : new Date(),
        'meter_reading_date' : new Date()
      },
      errors: {},
      customer: {},
      redirectToView : false,
      account_user : {},
      isLoaded : false
    };
  }

  componentDidMount() {
    Swal.fire({
      width: "10%",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    Swal.showLoading();
    const account_user = JSON.parse(localStorage.getItem('account_user'));
    this.setState({
      account_user
    });
    const api = "http://127.0.0.1:8000/api/sp/meter/" + this.state.meter_id;
    axios
      .get(api)
      .then((res) => {
        this.setState({
          meter: res.data,
          isLoaded : true
        });
        const api2 =
          "http://127.0.0.1:8000/api/customer/" + this.state.meter.customer_id;
        axios
          .get(api2)
          .then((res2) => {
            this.setState({
              customer: res2.data,
              isLoaded : true
            });
            Swal.close();
          })
          .catch((err2) => {
            this.setState({
              isLoaded : true
            });
            console.log(err2);
            Swal.close();
            Swal.fire({
              title: "Something went wrong!",
              icon: "error",
              text: "we loss connection to the database!",
              showCancelButton: false,
              showConfirmButton: false,
            });
          });
      })
      .catch((err) => {
        this.setState({
          isLoaded : true
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

  // validation 
  validateStateInput = () =>{
    let fields = this.state.fields;
    let errors = {};
    let isValid = true;
    if(!fields['meter_reading'] || fields['meter_reading']===null){
        errors['meter_reading'] = "cannot be empty!";
        isValid = false;
    }else if (typeof fields["meter_reading"] !== "undefined") {
        if (isNaN(fields["meter_reading"])) {
            isValid = false;
            errors["meter_reading"] = "Only Numbers allowed";
        }
    }

    if(!fields['meter_reading_month_year'] || fields['meter_reading_month_year']===null){
        errors['meter_reading_month_year'] = "cannot be empty!";
        isValid = false;
    }

    if(!fields['meter_reading_date'] || fields['meter_reading_date']===null){
        errors['meter_reading_date'] = "cannot be empty!";
        isValid = false;
    }
    
    this.setState({errors});
    return isValid;
  }

  // location checker
  checkLocation = () =>{
    let lat_b = false;
    let long_b = false;
    let m_lat = parseFloat(this.state.meter.meter_latitude);
    let m_long = parseFloat(this.state.meter.meter_longitude);
    let t_lat = this.props.coords.latitude;
    let t_long = this.props.coords.longitude;
    
    if( (Math.abs(m_lat)-0.000015) <= Math.abs(t_lat) && Math.abs(t_lat) <= (Math.abs(m_lat)+0.000015) ){
      lat_b = true;
    }  
    if((Math.abs(m_long)-0.000015)<=Math.abs(t_long) && Math.abs(t_long)<=(Math.abs(m_long)+0.000015)){
      long_b = true;
    }  
    return lat_b && long_b;
  }

  // submit form
  submitForm = (e) =>{
    e.preventDefault();
    if(this.checkLocation()){
      if(this.validateStateInput()){
        Swal.fire({
          width:'10%',
          allowOutsideClick:false,
          allowEscapeKey:false,
          allowEnterKey:false
        });
        Swal.showLoading();
        const api = "http://127.0.0.1:8000/api/meterrecord/";
        axios.post(api, {
            'sp_emp_id': this.state.account_user.sp_emp_id,
            'meter_id': this.state.meter.meter_id,
            'meter_reading': this.state.fields['meter_reading'],
            'meter_reading_month_year': moment(this.state.fields['meter_reading_month_year']).format("YYYY-MM-DD"),
            'meter_reading_date': moment(this.state.fields['meter_reading_date']).format("YYYY-MM-DD"),
            
        },{
            headers: {
                'Accept': 'application/json'
            }
        }).then(res =>{
            Swal.close();
            Swal.fire({
                title: 'Success!',
                html: '<i>Service Provider Successfuly Registerd!</i>',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false
            }).then(res =>{
              this.setState({
                redirectToView : true
              });
            });
        }).catch(err =>{
            console.error(err);
            Swal.close();
            if(err.response){
                this.setState({
                    errors : err.response.data.errors
                });
            }else{
                Swal.fire({
                    title: 'Something went wrong!',
                    icon: 'error',
                    text: 'we loss connection to the database!',
                    showCancelButton: false,
                    showConfirmButton: false
                })
            }
        });
      }
    }else{
      Swal.fire({
        title: 'Location Error',
        icon: 'error',
        text: 'we detected that your location didnot match with meter location!',
        showCancelButton: false,
        showConfirmButton: false
      })
    }
  }
  // input change handler
  inputHandler = (e,s) => {
    let fields = this.state.fields;
    if(s===1){
      fields[e.target.name] = e.target.value;
      this.setState({
        fields,
      });
    }else{
      fields[s] = e;
      this.setState({
        fields,
      });
    }
  };

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
  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Add Meter Record</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-outline card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  Add Meter Record
                </h3>
              </div>
              {this.state.isLoaded ? 
                Object.keys(this.state.customer).length ?
                (
                  <AddRecordFormFun state={this.state} submitForm={this.submitForm} inputHandler={this.inputHandler} />
                ) : <div>No data found</div>
              :(
                this.loadingPage()
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default geolocated()(Addrecordform);
