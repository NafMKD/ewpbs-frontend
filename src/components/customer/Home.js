import React, { Component } from 'react'
import Aside from './all/Aside'
import NavBar from './all/NavBar'
import Footer from './all/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import GetID from './sp/GetID';
import { Routes, Route } from 'react-router-dom';


class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
          customerInformation :{},
          isLoaded : false
        }
      }
    
      componentDidMount(){
        let api = "http://127.0.0.1:8000/api/customer/1";
        axios.get(api).then(res =>{
          this.setState({
            customerInformation : res.data,
            isLoaded : true
          });
        }).catch(err =>{
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
    render() {
        if(this.state.isLoaded)Swal.close();
        return (
            <div>
                {this.state.isLoaded ? (
                <div>
                    <NavBar/>
                    <Aside customerInformation={this.state.customerInformation}/>
                    <Routes>
                        <Route path="/customer/sp/:sp_id/*" element={<GetID customerInformation={this.state.customerInformation}/>}/>
                    </Routes>
                    <Footer/>
                </div>
                ):this.loadingPage()}
            </div>
        )
    }
}

export default Home
