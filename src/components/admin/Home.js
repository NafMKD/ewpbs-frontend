import React, { Component } from "react";
import Aside from "./all/Aside";
import NavBar from "./all/NavBar";
import Footer from "./all/Footer";
import AddNew from "./spc/AddNew";
import { Routes, Route } from "react-router-dom";
import ListView from "./spc/ListView";
import ErrorPage from "../ErrorPage";
import Dashboard from "./Dashboard";
import Profile from "./profile/Main";
class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Aside />
        <Routes>
          <Route path="/admin/spc/addnew" element={<AddNew />} />
          <Route path="/admin/spc/listview/*" element={<ListView />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Home;
