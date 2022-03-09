import React, { Component } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sp_id: this.props.sp_id,
			isLoaded: false,
			account_user: {},
			sp_information: {}
		};
	}

	componentDidMount() {
		const account_user = JSON.parse(localStorage.getItem('account_user'));
		this.setState({
			account_user
		});
		const api = "http://127.0.0.1:8000/api/sp/"+this.state.sp_id;
		axios
      .get(api)
      .then((res) => {
        this.setState({
          sp_information: res.data,
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

	// desplay information
	displayInfo = () =>{
		Swal.close();
		return (
			<div>
				<dl className="row">
					<dt className="col-md-4">Service Provider Name:</dt>
					<dd className="col-md-8">{this.state.sp_information.data.sp_name}</dd>
					<dt className="col-md-4">Service Provider Town:</dt>
					<dd className="col-md-8">{this.state.sp_information.data.sp_town}</dd>
					<dt className="col-md-4">Service Provider Region:</dt>
					<dd className="col-md-8">{this.state.sp_information.data.sp_region}</dd>
					<dt className="col-md-4">Customer Name:</dt>
					<dd className="col-md-8">{this.state.account_user.customer_first_name} {this.state.account_user.customer_middle_name} {this.state.account_user.customer_last_name}</dd>
					<dt className="col-md-4">Account Created At:</dt>
					<dd className="col-md-8">{moment(this.state.created_at).format("MMM Do YY [at] HH:mm")}</dd>
				</dl>
			</div>
		);
	}

	render() {
		return (
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">S.P. Detail</h1>
							</div>
						</div>
					</div>
				</div>
				<section className="content">
					<div className="container-fluid">
						<div className="card card-outline card-primary">
							<div className="card-header">
								<h3 className="card-title">Detail Inforation:</h3>
							</div>
							<div className="card-body">
							{this.state.isLoaded ? this.displayInfo() : this.loadingPage()}
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Detail;
