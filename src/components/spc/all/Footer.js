import React from "react";

const Footer = (props) => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright © {new Date().getFullYear} <a target="_blank" href="http://linose-studio.herokuapp.com/" rel="noreferrer">Linose <em>Studio</em></a>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>
  );
};

export default Footer;
