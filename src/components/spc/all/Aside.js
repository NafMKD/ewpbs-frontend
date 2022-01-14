import React from "react";
import { Link, NavLink } from "react-router-dom";

const Aside = (props) => {
  const {spc_name} = JSON.parse(localStorage.getItem('account_user'));
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="#" className="brand-link">
        <span className="brand-text font-weight-light">S.P.C. {spc_name}</span>
      </Link>
    
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex"></div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
            
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="nav-icon fas fa-desktop" />
                <p> Dashboard </p>
              </NavLink>
            </li> 

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-university" />
                <p> Service Provider </p>
                <i className="right fas fa-angle-left" />
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/spc/sp/addnew" className="nav-link">
                    <i className="nav-icon fas fa-plus" />
                    <p> Add New </p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/spc/sp/listview" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p> List View </p>
                  </NavLink>
                </li>
              </ul>
            </li> 

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p> Tarifs </p>
                <i className="right fas fa-angle-left" />
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/spc/tarif/addnew" className="nav-link">
                    <i className="nav-icon fas fa-plus" />
                    <p> Add New </p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/spc/tarif/listview" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p> List View </p>
                  </NavLink>
                </li>
              </ul>
            </li> 
            
            <li className="nav-item">
              <NavLink to="/spc/profile" className="nav-link">
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
