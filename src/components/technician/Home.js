import React, { Component } from 'react';
import Aside from './all/Aside';
import NavBar from './all/NavBar';
import Footer from './all/Footer';
import {Routes, Route} from 'react-router-dom'
import AddRecord from './record/AddRecord'
import GetId from "./record/GetId"
import Recordlist from './record/RecordList';
import ErrorPage from '../ErrorPage';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Aside/>
                <Routes>
                    <Route path="/technician/record/addnew/" element={<AddRecord />} />
                    <Route path="/technician/record/addnew/:meter_id/*" element={<GetId />} />
                    <Route path="/technician/record/listview" element={<Recordlist />} />
                    <Route exact path="/" element={""}/>
                    <Route path="/technician/profile" element={""}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}

export default Home;
