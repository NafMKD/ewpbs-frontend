import React, { Component } from 'react'
import AddAccount from './inc/AddAccount';
import AddInfo from './inc/AddInfo';
import axios from 'axios';
import Swal from 'sweetalert2'

class AddNew extends Component {
    // constructor
    constructor(props){
        super(props);
        this.state = {
            fields : {},
            errors : {},
            nextPage : false
        }
    }

    // handle page change
    changePageBtn = (e,t) =>{
        e.preventDefault();
        if(this.validateStateInput(t)){
            let prevPage = this.state.nextPage
            this.setState({
                nextPage:!prevPage
            });
        }
    }

    // handle input change
    inputChangeHandler = (e) =>{
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        });
    }

    // handle validation
    validateStateInput = (type) =>{
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        if(type==='f' || type==='a'){
            if(!fields['sp_emp_first_name'] || fields['sp_emp_first_name']===null){
                errors['sp_emp_first_name'] = "cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_emp_first_name"] !== "undefined") {
                if (!fields["sp_emp_first_name"].match(/^[a-zA-Z]+$/)) {
                  isValid = false;
                  errors["sp_emp_first_name"] = "Only letters allowed";
                }
            }
            if(!fields['sp_emp_middle_name'] || fields['sp_emp_middle_name']===null){
                errors['sp_emp_middle_name'] = "cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_emp_middle_name"] !== "undefined") {
                if (!fields["sp_emp_middle_name"].match(/^[a-zA-Z]+$/)) {
                  isValid = false;
                  errors["sp_emp_middle_name"] = "Only letters allowed";
                }
            }
            if(!fields['sp_emp_last_name'] || fields['sp_emp_last_name']===null){
                errors['sp_emp_last_name'] = "cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_emp_last_name"] !== "undefined") {
                if (!fields["sp_emp_last_name"].match(/^[a-zA-Z]+$/)) {
                  isValid = false;
                  errors["sp_emp_last_name"] = "Only letters allowed";
                }
            }
            if(!fields['sp_emp_region'] || fields['sp_emp_region']===null){
                errors['sp_emp_region'] = "cannot be empty!";
                isValid = false;
            }
            if(!fields['sp_emp_town'] || fields['sp_emp_town']===null){
                errors['sp_emp_town'] = "cannot be empty!";
                isValid = false;
            }
            if(!fields['sp_emp_house_no'] || fields['sp_emp_house_no']===null){
                errors['sp_emp_house_no'] = "cannot be empty!";
                isValid = false;
            }
            if(!fields['sp_emp_phone'] || fields['sp_emp_phone']===null){
                errors['sp_emp_phone'] = "cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_emp_phone"] !== "undefined") {
                if (isNaN(fields["sp_emp_phone"])) {
                  isValid = false;
                  errors["sp_emp_phone"] = "Only Numbers allowed";
                }
            }
            if(type==='a'){
                if(!fields['sp_emp_username'] || fields['sp_emp_username']===null){
                    errors['sp_emp_username'] = "cannot be empty!";
                    isValid = false;
                }

                if(!fields['sp_emp_password'] || fields['sp_emp_password']===null){
                    errors['sp_emp_password'] = "Password cannot be empty!";
                    isValid = false;
                }

                if(!fields['sp_emp_password_confirmation'] || fields['sp_emp_password_confirmation']===null){
                    errors['sp_emp_password_confirmation'] = "cannot be empty!";
                    isValid = false;
                }else if(fields['sp_emp_password_confirmation']!==fields['sp_emp_password']){
                    errors['sp_emp_password_confirmation'] = "Password not match!";
                    isValid = false;
                }
            }
        }
        this.setState({errors});
        return isValid;
    }

    // hangle form submition
    submitFormBtn = (e) =>{
        e.preventDefault();
        if(this.validateStateInput('a')){
            Swal.fire({
                width:'10%',
                allowOutsideClick:false,
                allowEscapeKey:false,
                allowEnterKey:false
            });
            Swal.showLoading();
            const api = "http://127.0.0.1:8000/api/spemployee";
            axios.post(api, {
                'sp_id' : 1,
                'sp_emp_first_name' : this.state.fields['sp_emp_first_name'],
                'sp_emp_middle_name' : this.state.fields['sp_emp_middle_name'],
                'sp_emp_last_name' : this.state.fields['sp_emp_last_name'],
                'sp_emp_region' : this.state.fields['sp_emp_region'],
                'sp_emp_town' : this.state.fields['sp_emp_town'],
                'sp_emp_phone' : this.state.fields['sp_emp_phone'],
                'sp_emp_house_no' : this.state.fields['sp_emp_house_no'],
                'sp_emp_username' : this.state.fields['sp_emp_username'],
                'sp_emp_password' : this.state.fields['sp_emp_password'],
                'sp_emp_password_confirmation' : this.state.fields['sp_emp_password_confirmation'],  
            },{
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res =>{
                Swal.close();
                Swal.fire({
                    title: 'Success!',
                    html: '<i>Service Provider Category Successfuly Registerd!</i>',
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
                    <h1 className="m-0">Add Tecnician</h1>
                    </div>
                </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    {this.state.nextPage?<AddAccount changePageBtn={this.changePageBtn} inputChangeHandler={this.inputChangeHandler} state={this.state} submitFormBtn={this.submitFormBtn}/>:<AddInfo changePageBtn={this.changePageBtn} inputChangeHandler={this.inputChangeHandler} state={this.state}/>}
                </div>
            </section>
            </div>
        )
    }
}
export default AddNew
