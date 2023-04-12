import React from "react";
import Admins from "../admins/index";
import Users from "../users/index";
import "./index.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard_container">
        <h1 className="dash_content">Dashboard super Admin :</h1>
        <div className="dashboard_admins">
          <Admins />
        </div>
        <div className="dashboard_users">
          <Users />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
