import React, { useState } from "react";
import Right from "./Right";
import Left from "./Left";
const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({});

  if (!isLoaded) {
    setUserData(JSON.parse(localStorage.getItem("account_user")));
    setIsLoaded(true);
  }
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0"> Profile </h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Left userData={userData} />
              <Right userData={userData} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Main;
