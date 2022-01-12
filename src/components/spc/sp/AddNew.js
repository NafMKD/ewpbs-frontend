import axios  from 'axios';
import React, { Component } from 'react'
import AddAccount from './inc/AddAccount'
import AddInfo from './inc/AddInfo'
import Swal from 'sweetalert2'

class AddNew extends Component {
    // constractor
    constructor(props){
        super(props);
        this.state = {
            fields : {},
            errors : {},
            nextPage : false
        }
    }
    // handle validation
    validateStateInput = (type) =>{
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        if(type==='f' || type==='a'){
            if(!fields['sp_name'] || fields['sp_name']===null){
                errors['sp_name'] = "Name cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_name"] !== "undefined") {
                if (!fields["sp_name"].match(/^[a-zA-Z]+$/)) {
                  isValid = false;
                  errors["sp_name"] = "Only letters allowed";
                }
            }
            if(!fields['sp_region'] || fields['sp_region']===null){
                errors['sp_region'] = "Region cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_region"] !== "undefined") {
                if (!fields["sp_region"].match(/^[a-zA-Z ]+$/)) {
                  isValid = false;
                  errors["sp_region"] = "Only letters allowed";
                }
            }
            if(!fields['sp_town'] || fields['sp_town']===null){
                errors['sp_town'] = "Town cannot be empty!";
                isValid = false;
            }else if (typeof fields["sp_town"] !== "undefined") {
                if (!fields["sp_town"].match(/^[a-zA-Z]+$/)) {
                  isValid = false;
                  errors["sp_town"] = "Only letters allowed";
                }
            }
            if(!fields['sp_zone'] || fields['sp_zone']===null){
                errors['sp_zone'] = "Zone cannot be empty!";
                isValid = false;
            }
            if(type==='a'){
                if(!fields['sp_username'] || fields['sp_username']===null){
                    errors['sp_username'] = "username cannot be empty!";
                    isValid = false;
                }

                if(!fields['sp_password'] || fields['sp_password']===null){
                    errors['sp_password'] = "Password cannot be empty!";
                    isValid = false;
                }

                if(!fields['sp_password_confirmation'] || fields['sp_password_confirmation']===null){
                    errors['sp_password_confirmation'] = "Confirm password cannot be empty!";
                    isValid = false;
                }else if(fields['sp_password_confirmation']!==fields['sp_password']){
                    errors['sp_password_confirmation'] = "Password not match!";
                    isValid = false;
                }
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

    // change button click handler
    changePageBtn = (e,f) =>{
        e.preventDefault();
        if(this.validateStateInput(f)){
            let prevNextPage = this.state.nextPage;
            this.setState({
                nextPage : !prevNextPage
            });
        }
    }

    // submit form handler
    submitForm = (e) =>{
        e.preventDefault();
        if(this.validateStateInput('a')){
            Swal.fire({
                width:'10%',
                allowOutsideClick:false,
                allowEscapeKey:false,
                allowEnterKey:false
            });
            Swal.showLoading();
            const api = "http://127.0.0.1:8000/api/sp";
            axios.post(api, {
                'spc_id' : 1,
                'sp_name' : this.state.fields['sp_name'],
                'sp_region' : this.state.fields['sp_region'],
                'sp_zone' : this.state.fields['sp_zone'],
                'sp_town' : this.state.fields['sp_town'],
                'sp_username' : this.state.fields['sp_username'],
                'sp_password' : this.state.fields['sp_password'],
                'sp_password_confirmation' : this.state.fields['sp_password_confirmation'],
                
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
                    {this.state.nextPage ? <AddAccount submitForm={this.submitForm} inputHandler={this.inputHandler} changePageBtn={this.changePageBtn} state={this.state}/> :<AddInfo inputHandler={this.inputHandler} changePageBtn={this.changePageBtn} state={this.state}/>}
                </div>
            </section>
            </div>
        )
    }
}

export default AddNew;