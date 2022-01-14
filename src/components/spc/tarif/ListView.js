import React, { Component } from 'react'
import DataTable, {createTheme} from 'react-data-table-component'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment';

class ListView extends Component {
    // constractor
    constructor(props){
        super(props);
        this.state = {
            tarif : {},
            account_user : {},
            isLoaded : false
        }
    }

    // fetching data when it mounts
    componentDidMount(){
        let account_user = JSON.parse(localStorage.getItem('account_user'));
        this.setState({
            account_user 
        });
        const api = "http://127.0.0.1:8000/api/spc/tarif/spc/"+account_user.spc_id;
        axios.get(api).then(res => {
            this.setState({
                tarif : res.data.data.tarifs,
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
    dataPage = () =>{
        Swal.close();
        const customStyles = {
            header: {
            	style: {
            		minHeight: '56px',
            	},
            	},
            	headRow: {
            		style: {
            	        borderTopStyle: 'solid',
            			borderTopWidth: '1px',
            			borderTopColor: 'white',
                        borderBottomStyle: 'solid',
            			borderBottomWidth: '1px',
            			borderBottomColor: 'white',
            		},
            	},
            	headCells: {
            		style: {
            				borderRightStyle: 'solid',
            				borderRightWidth: '1px',
            				borderRightColor: 'white',
                            borderLeftStyle: 'solid',
            				borderLeftWidth: '1px',
            				borderLeftColor: 'white',
            			
            		},
            	},
            	cells: {
            		style: {
            				borderRightStyle: 'solid',
            				borderRightWidth: '1px',
            				borderRightColor: 'white',
                            borderLeftStyle: 'solid',
            				borderLeftWidth: '1px',
            				borderLeftColor: 'white',
                            borderBottomStyle: 'solid',
            				borderBottomWidth: '1px',
            				borderBottomColor: 'white',
            			
            		},
            	},
            };
        createTheme('solarized', {
                text: {
                  primary: 'white',
                  secondary: 'white',
                },
                background: {
                  default: '#343a40',
                }
        })
        const columns = [
            {
                name: 'id',
                selector: row => row.spc_tarif_id,
                sortable: true,
            },
            {
                name: 'Min Reading',
                selector: row => row.spc_tarif_meter_min,
                sortable: true,
            },
            {
                name: 'Max Reading',
                selector: row => row.spc_tarif_meter_max,
                sortable: true,
            },
            {
                name: 'Ammount(Br.)',
                selector: row => row.spc_tarif_amount,
                sortable: true,
            },
            {
                name: 'Created At',
                selector: row => moment(row.created_at).format("MMM Do, YYYY [at] hh:mm"),
            },
            {
                name: 'Updated At',
                selector: row => moment(row.updated_at).format("MMM Do, YYYY [at] hh:mm"),
            },
        ];
        return <DataTable 
                    title= "List of Tarif"
                    columns={columns}
                    data={this.state.tarif} 
                    customStyles={customStyles}
                    theme="solarized"
                    pagination
                />;
    }
    render() {
        return (
            <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">S.P.C. Tarif</h1>
                    </div>
                </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title">S.P.C Tarif List:</h3>
                        </div>
                        <div className="card-body">
                            <br/>
                            {this.state.isLoaded ?  this.dataPage()  : this.loadingPage()
                            }
                        </div>
                    </div>                      
                </div>
            </section>
            </div>
        )
    }
}

export default ListView
