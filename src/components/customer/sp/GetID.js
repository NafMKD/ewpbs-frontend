import React from 'react'
import {  Routes, Route, useParams } from 'react-router-dom'
import ActiveList from './bill/ActiveList'
import GetBillId from './bill/GetBillId'
import PaidList from './bill/PaidList'

const GetID = (props) => {
    const {sp_id} = useParams();
    return (
        <Routes>
            <Route path="/bill/active" element={<ActiveList customerInformation={props.customerInformation} sp_id={sp_id}/>}/>
            <Route path="/bill/paid" element={<PaidList customerInformation={props.customerInformation} sp_id={sp_id}/>}/>
            <Route path="/bill/paybill/:bill_id/*" element={<GetBillId customerInformation={props.customerInformation} sp_id={sp_id}/>}/>
        </Routes>
    )
}

export default GetID