import React, { Component } from "react";
import Aside from "./all/Aside";
import NavBar from "./all/NavBar";
import Footer from "./all/Footer";
import AddNew from "./spc/AddNew";
import { Routes, Route } from "react-router-dom";
import ListView from "./spc/ListView";

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Aside />
        <Routes>
            <Route path="/admin/spc/addnew" element={<AddNew />} />
            <Route path="admin/spc/listview/*" element={<ListView />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Home;
