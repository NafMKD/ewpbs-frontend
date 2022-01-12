import React, { Component } from 'react'
import Aside from './all/Aside';
import NavBar from './all/NavBar';
import Footer from './all/Footer';
import {Routes, Route} from 'react-router-dom'
import AddNewSp from './sp/AddNew';
import ListViewSp from './sp/ListView';
import AddNewTarif from './tarif/AddNew';
import ListViewTarif from './tarif/ListView';
class Home extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Aside/>
                <Routes>
                    <Route path="/spc/sp/addnew" element={<AddNewSp />} />
                    <Route path="/spc/sp/listview/*" element={<ListViewSp />} />
                    <Route path="/spc/tarif/addnew" element={<AddNewTarif />} />
                    <Route path="/spc/tarif/listview/*" element={<ListViewTarif />} />
                </Routes>
                <Footer/>
            </div>
        )
    }
}

export default Home;