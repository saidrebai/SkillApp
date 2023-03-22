import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [offerCount, setOfferCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/offerRouter/getofferAdmin/:id"
      );
      setOffers(response.data?.offers);
      setOfferCount(response.data.offers.length);
    }
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(offerCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOffers = offers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="Offer_grid">
        <div className="number_of_offers">
          <p>Number of Offers : {offerCount}</p>
        </div>
        <div className="Offer">
          {currentOffers.length > 0 ? (
            currentOffers.map((offerModel) => (
              <div className="Offer_container" key={offerModel._id}>
                <div className="Offer_avatar">
                  <Avatar src="/broken-image.jpg" />
                </div>
                <div className="Offer_information">
                  <div className="Offer_title">{offerModel.title}</div>
                  <div className="Offer_description">
                    {offerModel.description}
                  </div>
                </div>
                <div className="button_display">
                  <button type="submit">Display</button>
                </div>
              </div>
            ))
          ) : (
            <div>No offers to display</div>
          )}
        </div>
        <div className="pagination_container">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Offers;
