import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";

const GetOffer = () => {
    const id = localStorage.getItem("id");

    const [offers, setOffers] = useState([]);
    const [offerCount, setOfferCount] = useState(0);
    const [popup, setPopup] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const toggleModel = (offer) => {
        setSelectedOffer(offer);
        setPopup(!popup);
        console.log("gggg", popup);
    }

    if (popup) {
        document.body.classList.add('active-popup')
    } else {
        document.body.classList.remove('active-popup')
    }
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/offerRouter/getofferbyid/${id}`);
          setOffers(response.data.offer);
          setOfferCount(response.data.offerCount);
          console.log("response",response.data);
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
        fetchData();
      }, []);
      console.log("testtttt",offerCount)

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await axios.get(`http://localhost:8080/api/offerRouter/getofferbyid/${id}`);
    //         setOffers(response.data?.offers);
    //         setOfferCount(response.data?.offers.length);
    //         console.log("response=========>",response);
    //     }
    //     fetchData();
    // }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentoffer = offers.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }
    return (
        <>
        <div className='offerr_gird'>
            <div className='number_of_offer'>
                <p>Number of offer : {offerCount}</p>
            </div>
            <div className='offerr'>
                {currentoffer.length > 0 ? (
                    currentoffer.map((offer) => (
                        <div className='offerr_container' key={offer._id}>
                            <div className='offerr_avatar'><Avatar src="/broken-image.jpg" /></div>
                            <div className='offerr_infromation'>
                                <div className='offerr_name'>{offer.Name}</div>
                            </div>
                            <div className='button_display'>
                                <button type="submit" onClick={() => toggleModel(offer)}>Display</button>
                            </div>


                        </div>
                    ))

                ) : (
                    <div>No offer to display</div>
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
                </Stack></div>
        </div>
            {popup && (
                <div className="popup_container">
                    <div className="overlay" onClick={() => toggleModel(null)} >
                    </div>
                    <div className="popup_content">
                        <div className="offer_info" >
                            <div className="offer_data">
                                <Avatar src="/broken-image.jpg" />
                            </div>
                            <div className="offer_data">
                               Type :  {selectedOffer?.type}
                            </div>
                            <div className="offer_data">
                                Time :{selectedOffer?.Ttime}
                            </div>
                            <div className="offer_data">
                                Description : {selectedOffer?.description}
                            </div>
                            <div className="offer_data">
                                Skills : {selectedOffer?.skills}
                            </div>
                            <div className="offer_data">
                                Adresse :  {selectedOffer?.adresse}
                            </div>
                            <div className="offer_data">
                                Company Name : {selectedOffer?.company_name}
                            </div>

                        </div>

                        <button
                            className="close_popup"
                            type='button'
                            onClick={() => toggleModel(null)}>close</button>
                    </div>

                </div>
            )}
            </>

    )
}

export default GetOffer;
