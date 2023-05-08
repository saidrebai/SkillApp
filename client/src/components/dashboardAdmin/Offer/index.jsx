import React from "react";
import AddOffers from "../AddOffers/index";
import GetOffers from "../GetOffers/index";
import './index.css'

const Offer = () => {
  return (
    <>
      <div className="off_container">
        <div className="dashboard_add">
          <AddOffers />
        </div>
        <div className="dashboard_get">
          <GetOffers />
        </div>
      </div>
    </>
  );
};

export default Offer;
