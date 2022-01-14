import React from 'react'
import Paybill from './PayBill'
import {  Routes, Route, useParams } from 'react-router-dom'

const GetBillId = (props) => {
    let {bill_id} = useParams();
    return (
        <Routes>
            <Route exact path="" element={<Paybill sp_id={props.sp_id} bill_id={bill_id} />}/>
        </Routes>
    )
}

export default GetBillId;
