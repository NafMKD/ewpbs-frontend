import React from "react";
import { Link, NavLink } from "react-router-dom";

const Aside = (props) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <span className="brand-text font-weight-light">Service Provider</span>
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
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p> Customer </p>
                <i className="right nav-icon fas fa-angle-left"/>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/sp/customer/addnew" className="nav-link">
                    <i className="nav-icon fas fa-plus" />
                    <p>Add New</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sp/customer/listview" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>List View</p>
                  </NavLink>
                </li>
              </ul>
            </li> 

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-cogs" />
                <p> Technician </p>
                <i className="right nav-icon fas fa-angle-left"/>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/sp/technician/addnew" className="nav-link">
                    <i className="nav-icon fas fa-plus" />
                    <p>Add New</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sp/technician/listview" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>List View</p>
                  </NavLink>
                </li>
              </ul>
            </li> 

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-file-invoice-dollar" />
                <p> Bill </p>
                <i className="right nav-icon fas fa-angle-left"/>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/sp/bill/active" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>Active Bill</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sp/bill/paid" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>Paid Bill</p>
                  </NavLink>
                </li>
              </ul>
            </li> 

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p> Meter Record </p>
                <i className="right nav-icon fas fa-angle-left"/>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/sp/meterrecord/active" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>Active Record</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sp/meterrecord/calculated" className="nav-link">
                    <i className="nav-icon fas fa-list" />
                    <p>Calculated Record</p>
                  </NavLink>
                </li>
              </ul>
            </li> 

            <li className="nav-item">
              <NavLink to="/sp/profile" className="nav-link">
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
