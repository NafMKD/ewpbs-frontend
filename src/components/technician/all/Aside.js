import React from "react";
import { NavLink } from "react-router-dom";

const Aside = (props) => {
  const {sp_emp_first_name,sp_emp_middle_name} = JSON.parse(localStorage.getItem('account_user'));
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <span className="brand-text font-weight-light">Technician : {sp_emp_first_name} {sp_emp_middle_name}</span>
      </a>
    
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex"></div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="nav-icon fas fa-desktop" />
                <p> Dashboard </p>
              </NavLink>
            </li>  
            
            <li className="nav-item">
              <NavLink to="/technician/record/addnew" className="nav-link">
                <i className="nav-icon fas fa-plus" />
                <p> Add Meter Record </p>
              </NavLink>
            </li>  

            <li className="nav-item">
              <NavLink to="/technician/record/listview" className="nav-link">
                <i className="nav-icon fas fa-list" />
                <p> Meter Revord List</p>
              </NavLink>
            </li> 

            <li className="nav-item">
              <NavLink to="/technician/profile" className="nav-link">
                <i className="nav-icon fas fa-user" />
                <p> Profile </p>
              </NavLink>
            </li>  
          </ul>
        </nav>
      </div>
    </aside>
  );
};
export default Aside;
