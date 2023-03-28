import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  const [updatedOffer, setUpdatedOffer] = useState({ Name: "" });

  const toggleModel = (offer) => {
    setSelectedOffer(offer);
    setPopup(!popup);
    console.log("gggg", popup);
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/offerRouter/getofferbyid/${id}`
      );
      setOffers(response.data.offer);
      setOfferCount(response.data.offerCount);
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("testtttt", offers);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/offerRouter/getofferbyid/${id}`)
      .then((response) => {
        setOffers(response.offers.offers);
        console.log("rererere------", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    console.log("data is herrrrrrrrrre", offers);
  }, [offers]);

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/offerRouter/updateoffer/${updatedOffer._id}`,
        updatedOffer
      )
      .then((response) => {
        setOffers((prevOffers) =>
          prevOffers.map((o) => {
            if (o._id === updatedOffer._id) {
              return updatedOffer;
            }
            return o;
          })
        );
        console.log("reeeeeessssssssssss", response);
        toast.success("Updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update failed!");
      });
    console.log("yeeeessssssssssssss", updatedOffer);
  };

  // useEffect(() => {
  //   offers ? setUpdatedOffer(offers) : setUpdatedOffer({ Name: "" });
  //   console.log("Offer--------", offers);
  // }, [offers]);
  useEffect(() => {
    if (selectedOffer) {
      setUpdatedOffer(selectedOffer);
    }
  }, [selectedOffer]);

  const handleDelete = (selectedOffer) => {
    axios
      .delete(
        `http://localhost:8080/api/offerRouter/deleteOffer/${selectedOffer._id}`
      )
      .then((response) => {
        // remove the deleted offer from the state
        setOffers((prevOffers) =>
          prevOffers.filter((o) => o._id !== selectedOffer._id)
        );
        console.log("Deleted", response);
        toast.success("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Deletion failed!");
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentoffer = offers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <div className="offerr_gird">
        <div className="number_of_offer">
          <p>Number of offer : {offerCount}</p>
        </div>
        <div className="offerr">
          {currentoffer.length > 0 ? (
            currentoffer.map((selectedOffer) => (
              <div className="offerr_container" key={selectedOffer._id}>
                <div className="offerr_avatar">
                  <Avatar src="/broken-image.jpg" />
                  <div className="offerr_name">{selectedOffer.Name}</div>
                </div>

                <div className="button_display">
                  <button
                    type="submit"
                    onClick={() => {
                      toggleModel(selectedOffer);
                    }}
                  >
                    Update
                  </button>

                  <button
                    type="submit"
                    onClick={() => handleDelete(selectedOffer)}
                  >
                    Delete
                  </button>
                  <ToastContainer />
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
          </Stack>
        </div>
      </div>
      {popup && (
        <div className="popup_container" style={{zIndex:"1"}}>
          <div className="overlay"  onClick={() => toggleModel(null)}></div>
          <div className="popup_content" >
            <div className="offer_info">
              <div className="offer_data">
                <Avatar src="/broken-image.jpg" />
              </div>
              <div className="offer_data">
                type :
                <input
                  type="text"
                  name="Type"
                  value={updatedOffer.type || selectedOffer?.type}
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      type: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="offer_data">
                time :
                <input
                  type="text"
                  name="time"
                  value={updatedOffer.time || selectedOffer?.time}
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      time: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="offer_data">
                Name :
                <input
                  type="text"
                  name="Name"
                  value={updatedOffer.Name || selectedOffer?.Name}
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      Name: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="offer_data">
                description :
                <input
                  type="text"
                  name="description"
                  value={updatedOffer.description || selectedOffer?.description}
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="offer_data">
                skills :
                <input
                  type="text"
                  name="skills"
                  value={updatedOffer.skills || selectedOffer?.skills}
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      skills: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="offer_data">
                adresse :
                <input
                  type="text"
                  name="adresse"
                  value={updatedOffer.adresse || selectedOffer?.adresse}
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      adresse: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="offer_data">
                company Name :
                <input
                  type="text"
                  name="company Name"
                  value={
                    updatedOffer.company_name || selectedOffer?.company_name
                  }
                  onChange={(e) => {
                    setUpdatedOffer({
                      ...updatedOffer,
                      company_name: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="close_popup">
              <button type="button" onClick={() => toggleModel(null)}>
                close
              </button>
            </div>
            <div>
              <button
                className="Save_popup"
                type="button"
                onClick={() => {
                  handleUpdate();
                  toggleModel(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetOffer;
