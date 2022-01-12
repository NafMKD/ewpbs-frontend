import React from "react";
import { Link } from "react-router-dom";
const NavBar = (props) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
        
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
            <i className="fas fa-bars" />
          </Link>
        </li>
      </ul>
      
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="#" className="nav-link" data-widget="navbar-search" role="button"  >
            <i className="fas fa-search" />
          </Link>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        <li className="nav-item mr-5">
          <Link to="/logout" className="nav-link" role="button">
            Log out <i className="fas fa-sign-out-alt ml-1 text-red" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
