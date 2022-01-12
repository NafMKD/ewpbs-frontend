import axios  from 'axios';
import React, { Component } from 'react'
import AddInfo from './inc/AddInfo'
import Swal from 'sweetalert2'

class AddNew extends Component {
    // constractor
    constructor(props){
        super(props);
        this.state = {
            fields : {},
            errors : {}
        }
    }
    // handle validation
    validateStateInput = () =>{
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        if(!fields['spc_tarif_amount'] || fields['spc_tarif_amount']===null){
            errors['spc_tarif_amount'] = "Amount cannot be empty!";
            isValid = false;
        }else if (typeof fields["spc_tarif_amount"] !== "undefined") {
            if (isNaN(fields["spc_tarif_amount"])) {
                isValid = false;
                errors["spc_tarif_amount"] = "Only Number allowed";
            }
        }
        if(!fields['spc_tarif_meter_max'] || fields['spc_tarif_meter_max']===null){
            errors['spc_tarif_meter_max'] = "Max reading cannot be empty!";
            isValid = false;
        }else if (typeof fields["spc_tarif_meter_max"] !== "undefined") {
            if (isNaN(fields["spc_tarif_meter_max"])) {
                isValid = false;
                errors["spc_tarif_meter_max"] = "Only Number allowed";
            }else if (fields["spc_tarif_meter_min"] >= fields['spc_tarif_meter_max']) {
                isValid = false;
                errors["spc_tarif_meter_max"] = "Max reading cannot be less than or equal Min reading";
            }
        }
        if(!fields['spc_tarif_meter_min'] || fields['spc_tarif_meter_min']===null){
            errors['spc_tarif_meter_min'] = "Min reading cannot be empty!";
            isValid = false;
        }else if (typeof fields["spc_tarif_meter_min"] !== "undefined") {
            if (isNaN(fields["spc_tarif_meter_min"])) {
                isValid = false;
                errors["spc_tarif_meter_min"] = "Only Number allowed";
            }else if (fields["spc_tarif_meter_min"] >= fields['spc_tarif_meter_max']) {
                isValid = false;
                errors["spc_tarif_meter_min"] = "Min reading cannot be grater than or equal Max reading";
            }
        }
        this.setState({errors});
        return isValid;
    }

    // handle when input changes it state
    inputHandler = (e) =>{
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        });
    }

    // submit form handler
    submitForm = (e) =>{
        e.preventDefault();
        if(this.validateStateInput()){
            Swal.fire({
                width:'10%',
                allowOutsideClick:false,
                allowEscapeKey:false,
                allowEnterKey:false
            });
            Swal.showLoading();
            const api = "http://127.0.0.1:8000/api/spc/tarif";
            axios.post(api, {
                'spc_id' : 1,
                'spc_tarif_meter_min' : this.state.fields['spc_tarif_meter_min'],
                'spc_tarif_meter_max' : this.state.fields['spc_tarif_meter_max'],
                'spc_tarif_amount' : this.state.fields['spc_tarif_amount']
                
            },{
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res =>{
                Swal.close();
                Swal.fire({
                    title: 'Success!',
                    html: '<i>Tarif Successfuly Registerd!</i>',
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false
                })
            }).catch(err =>{
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
    }
    render() {
        return (
            <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">Add Service Provider</h1>
                    </div>
                </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <AddInfo inputHandler={this.inputHandler} submitForm={this.submitForm} state={this.state}/>
                </div>
            </section>
            </div>
        )
    }
}

export default AddNew;