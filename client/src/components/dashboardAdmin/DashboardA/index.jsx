import React from "react";
import AddOffers from "../AddOffers/index";
import GetOffers from "../GetOffers/index";
import './index.css'

const DashboardA = () => {
  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_admins">
          <AddOffers />
        </div>
        <div className="dashboard_users">
          <GetOffers />
        </div>
      </div>
    </>
  );
};

export default DashboardA;
