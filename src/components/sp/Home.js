import React, { Component } from "react";
import Aside from "./all/Aside";
import NavBar from "./all/NavBar";
import Footer from "./all/Footer";
import { Routes, Route } from "react-router-dom";
import AddNewTech from "./technician/AddNew";
import ListViewTech from "./technician/ListView";
import AddNewCust from "./customer/AddNew";
import ListViewCust from "./customer/ListView";
import GetId from "./customer/GetId";
import ActivelistRecord from "./record/ActiveList";
import CalculatedList from "./record/CalculatedList";
import ActiveListBill from "./bill/ActiveList";
import HistoryList from "./bill/HistoryList";
import axios from "axios";

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Aside />
        <Routes>
          <Route path="/sp/technician/addnew" element={<AddNewTech />} />
          <Route path="/sp/technician/listview/*" element={<ListViewTech />} />
          <Route path="/sp/customer/addnew" element={<AddNewCust />} />
          <Route path="/sp/customer/addnew/:customer_id/*" element={<GetId />} />
          <Route path="/sp/customer/listview/*" element={<ListViewCust />} />
          <Route path="/sp/meterrecord/active" element={<ActivelistRecord />} />
          <Route path="/sp/meterrecord/calculated" element={<CalculatedList />} />
          <Route path="/sp/bill/active" element={<ActiveListBill />} />
          <Route path="/sp/bill/paid" element={<HistoryList />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Home;
