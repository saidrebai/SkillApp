import React from 'react';
import Card from "../Cards/offreCard";
import './index.css';

const Offer = () => {
  console.log("sallllllllllaaam")
  return (
    <div className="offr_main_container">
      <div className="offer_container_cards">
        <div className="offer_container_card">
          <Card/>
          </div>
      </div>
    </div>
  )
};

export default Offer;