import React, { Component } from "react";
import Aside from "./all/Aside";
import NavBar from "./all/NavBar";
import Footerd from "./all/Footer";
import { Routes, Route } from "react-router-dom";
import AddNewSp from "./sp/AddNew";
import ListViewSp from "./sp/ListView";
import AddNewTarif from "./tarif/AddNew";
import ListViewTarif from "./tarif/ListView";
import ErrorPage from "../ErrorPage";
import ProfileMain from "./profile/Main";
import Dashboard from "./Dashboard";
class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Aside />
        <Routes>
          <Route path="/spc/sp/addnew" element={<AddNewSp />} />
          <Route path="/spc/sp/listview/*" element={<ListViewSp />} />
          <Route path="/spc/tarif/addnew" element={<AddNewTarif />} />
          <Route path="/spc/tarif/listview/*" element={<ListViewTarif />} />
          <Route path="/spc/profile" element={<ProfileMain />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footerd />
      </div>
    );
  }
}

export default Home;
