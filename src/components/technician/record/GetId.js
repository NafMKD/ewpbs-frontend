import { Routes, Route, useParams} from "react-router-dom";
import React from 'react'
import AddRecordForm from "./AddRecordForm";

const GetId = () => {
    const {meter_id} = useParams();
    return (
        <Routes>
            <Route path="" element={<AddRecordForm meter_id={meter_id}/>} />
        </Routes>
    )
}

export default GetId;
