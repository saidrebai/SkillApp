import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';
import myImage from '../images/images.jpg';

export default function RecipeReviewCard() {

  const [offers, setOffers] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8080/api/offerRouter/getoffer');
      setOffers(response.data?.offer);
    }
    fetchData();
  }, []);
  console.log("======>", offers);

  return (
    <>
      {Array.isArray(offers) && offers.length > 0 ? (offers.map((offer) => (
        
        <div className="offer_container">
        <div className="offer_container_img">
        <img src="" alt=""/>
        </div>
        <div className="offer_container_info">
        <div className="Name_container">{offer.Name}</div>
        <div className="Type_container">{offer.type}</div>
        <div className="term_container"><label>duration : </label>{offer.term}</div>
        </div>
        <div className="offer_container_description">
          <label>Descritption : </label>{offer.description}
        <div className="skills_container"><label>Skills : </label>{offer.skills}</div>
        </div>
        <button className="apply_button">Apply</button>
        </div>
      ))) : (
        <div>No offers to display</div>

      )}
      </>);
}