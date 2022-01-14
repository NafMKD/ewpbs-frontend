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
            employee : {},
            account_user : {},
            isLoaded : false
        }
    }
    // fetching data when it mounts
    componentDidMount(){
        const account_user = JSON.parse(localStorage.getItem('account_user'));
        this.setState({
            account_user
        })
        const api = "http://127.0.0.1:8000/api/spemployee/sp/"+account_user.sp_id;
        axios.get(api).then(res => {
            this.setState({
                employee : res.data,
                isLoaded : true
            })
        }).catch(err =>{
            this.setState({
                isLoaded : true
            });
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
                selector: row => row.sp_emp_id,
                sortable: true,
            },
            {
                name: 'Name',
                selector: row => row.sp_emp_first_name +" "+row.sp_emp_middle_name +" "+row.sp_emp_last_name,
                sortable: true,
            },
            {
                name: 'Region',
                selector: row => row.sp_emp_region ,
                sortable: true,
            },
            {
                name: 'House No.',
                selector: row => row.sp_emp_house_no,
                sortable: true,
            },
            {
                name: 'Phone',
                selector: row => row.sp_emp_phone,
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
                    title= "List of Technician"
                    columns={columns}
                    data={this.state.employee} 
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
                    <h1 className="m-0">Technician</h1>
                    </div>
                </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Technician List:</h3>
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
export default ListView;
