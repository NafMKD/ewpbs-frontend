import React, { Component } from "react";
import Aside from "./all/Aside";
import NavBar from "./all/NavBar";
import Footer from "./all/Footer";
import GetID from "./sp/GetID";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import ProfileMain from "../customer/profile/Main";
import Dashboard from "./Dashboard";

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <NavBar />
          <Aside />
          <Routes>
            <Route path="/customer/sp/:sp_id/*" element={<GetID />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/customer/profile" element={<ProfileMain />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;
