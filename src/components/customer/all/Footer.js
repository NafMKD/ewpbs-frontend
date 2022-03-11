import moment from "moment";
import React from "react";

const Footer = (props) => {
  return (
    <footer className="main-footer">
      <strong>Copyright © {moment(new Date()).format("Y")}.</strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>
  );
};

export default Footer;
