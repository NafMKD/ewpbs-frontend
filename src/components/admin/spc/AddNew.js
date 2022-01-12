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
            if(!fields['spc_name'] || fields['spc_name']===null){
                errors['spc_name'] = "Name cannot be empty!";
                isValid = false;
            }else if (typeof fields["spc_name"] !== "undefined") {
                if (!fields["spc_name"].match(/^[a-zA-Z]+$/)) {
                  isValid = false;
                  errors["spc_name"] = "Only letters allowed";
                }
              }
            if(type==='a'){
                if(!fields['spc_username'] || fields['spc_username']===null){
                    errors['spc_username'] = "username cannot be empty!";
                    isValid = false;
                }

                if(!fields['spc_password'] || fields['spc_password']===null){
                    errors['spc_password'] = "Password cannot be empty!";
                    isValid = false;
                }

                if(!fields['spc_password_confirmation'] || fields['spc_password_confirmation']===null){
                    errors['spc_password_confirmation'] = "Confirm password cannot be empty!";
                    isValid = false;
                }else if(fields['spc_password_confirmation']!==fields['spc_password']){
                    errors['spc_password_confirmation'] = "Password not match!";
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
            const api = "http://127.0.0.1:8000/api/spc";
            axios.post(api, {
                'spc_name' : this.state.fields['spc_name'],
                'spc_username' : this.state.fields['spc_username'],
                'spc_password' : this.state.fields['spc_password'],
                'spc_password_confirmation' : this.state.fields['spc_password_confirmation']
                
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
                    <h1 className="m-0">Add Service Provider Category</h1>
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
