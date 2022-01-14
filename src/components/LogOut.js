import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout =(props) => {
    localStorage.removeItem('account_type');
    localStorage.removeItem('account_user');
    props.logoutHandler();
    let nav = useNavigate();
    nav('/');
    return (
        <div>
            Loading...
        </div>
    );
}

export default Logout;
