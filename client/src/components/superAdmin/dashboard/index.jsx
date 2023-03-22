import React from "react";
import Admins from "../admins/index";
import Users from "../users/index";
import "./index.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard_container">
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
