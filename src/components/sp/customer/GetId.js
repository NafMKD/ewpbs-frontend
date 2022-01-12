import { Routes, Route, useParams } from "react-router-dom";
import React from 'react'
import AddNewForm from "./AddNewForm";
import AddMeter from "./AddMeter";

const GetId = () => {
    const {customer_id} = useParams();
    return (
        <Routes>
            <Route path="" element={<AddNewForm customer_id={customer_id}/>} />
            <Route path="/addnew" element={<AddMeter customer_id={customer_id}/>} />
        </Routes>
    )
}

export default GetId;
