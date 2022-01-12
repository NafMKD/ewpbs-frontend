import React from "react";
import { Link, NavLink } from "react-router-dom";

const Aside = (props) => {
  const { sp_information } = props.customerInformation.data;
  const SpList = sp_information.map((sp) => {
    return (<li className="nav-item" key={sp.sp_id}>
      <Link to="#" className="nav-link">
        <i className="nav-icon fas fa-university" />
        <p> {sp.sp_name} </p>
        <i className="right nav-icon fas fa-angle-left" />
      </Link>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <NavLink to={"/customer/sp/"+sp.sp_id+"/detail"} className="nav-link">
            <i className="nav-icon fas fa-info-circle" />
            <p>Detail</p>
          </NavLink>
        </li>

        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="nav-icon fas fa-file-invoice-dollar" />
            <p>Bill</p>
            <i className="right nav-icon fas fa-angle-left" />
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <NavLink to={"/customer/sp/"+sp.sp_id+"/bill/active"} className="nav-link">
                <i className="nav-icon far fa-dot-circle" />
                <p>Active Bill</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/customer/sp/"+sp.sp_id+"/bill/paid"} className="nav-link">
                <i className="nav-icon far fa-dot-circle" />
                <p>Paid Bill</p>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="nav-icon fas fa-comment-dots" />
            <p>Complain</p>
            <i className="right nav-icon fas fa-angle-left" />
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <NavLink
                to={"/customer/sp/"+sp.sp_id+"/complain/addnew"}
                className="nav-link"
              >
                <i className="nav-icon fas fa-plus" />
                <p>Add Complain</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/customer/sp/"+sp.sp_id+"/complain/listview"}
                className="nav-link"
              >
                <i className="nav-icon fas fa-list" />
                <p>View Complain</p>
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </li>)
  });
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <span className="brand-text font-weight-light">Customer</span>
      </a>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex"></div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="nav-icon fas fa-desktop" />
                <p> Dashboard </p>
              </NavLink>
            </li>
            <li className="nav-header">Service Providers</li>

            {SpList}

            <li className="nav-header">Profile</li>
            <li className="nav-item">
              <NavLink to="/customer/profile" className="nav-link">
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
