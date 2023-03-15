import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';
import myImage from '../images/arsela-techmologies.png';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Card() {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8080/api/offerRouter/getoffer');
      setOffers(response.data?.offer);
    }
    fetchData();
  }, []);
  console.log("======>", offers);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentOffers = offers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <><div className="container">
      {currentOffers.length > 0 ? (
        currentOffers.map((offer) => (
          <div className="offer_container" key={offer.id}>
            <div className="offer_container_img">
              <img src={myImage} alt="" />
            </div>
            <div className="offer_container_info">
              <div className="Name_container"><label>Title : </label>{offer.Name}</div>
              <div className="Type_container"><label>Type : </label>{offer.type}</div>
              <div className="time_container"><label>time : </label>{offer.time}</div>
            </div>
            <div className="offer_container_description">
              <label>Descritption : </label>{offer.description}
            </div>
            <div className="skills_container"><label>Skills : </label>{offer.skills}</div>
            <div className="company_Name_container"><label>Entreprise : </label>{offer.company_name}</div>
            <div className="adresse_container"><label>Adresse : </label>{offer.adresse}</div>
            <button className="apply_button">Apply</button>
          </div>
        ))) : (
        <div>No offers to display</div>

      )}</div>
      <div className="pagination_container">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack></div>
    </>
  );
}