import React, { Component } from 'react'

export class Profile extends Component {
  render() {
    return (
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Profile</h1>
                    </div>
                </div>
            </div>
        </div>
        <section className="content">
            <div className="container-fluid">
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Profile Inforation:</h3>
                    </div>
                    <div className="card-body">
                        <h5>Personal Inforation:</h5>
                    
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
  }
}

export default Profile