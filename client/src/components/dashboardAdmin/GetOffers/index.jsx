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

                <div className="update_botton">
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
                </div>
              </div>
            ))
          ) : (
            <div>No offer to display</div>
          )}
          <ToastContainer />
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
        <div className="popup_container" style={{ zIndex: "1" }}>
          <div className="overlay" onClick={() => toggleModel(null)}></div>
          <div className="popup_content">
            <form
              onSubmit={() => {
                handleUpdate();
                toggleModel(null);
              }}
            >
              <h2>Enter your offers : </h2>

              <table className="table">
                <table>
                  <tr>
                    <div className="offer_data">
                      <td>
                        <label>Type : </label>
                      </td>
                      <td>
                        <select
                          className="inputt"
                          name="Type"
                          required={true}
                          value={updatedOffer.type}
                          onChange={(e) => {
                            setUpdatedOffer({
                              ...updatedOffer,
                              type: e.target.value,
                            });
                          }}
                        >
                          <option value="" disabled selected>
                            Type
                          </option>
                          <option value="Job">Job</option>
                          <option value="Internship">Internship</option>
                          <option value="Alternation">Alternation</option>
                        </select>
                      </td>
                    </div>
                  </tr>

                  <tr>
                    <div className="offer_data">
                      <td>
                        <label>Time : </label>
                      </td>
                      <td>
                        <select
                          className="inputt"
                          name="time"
                          required={true}
                          value={updatedOffer.time}
                          onChange={(e) => {
                            setUpdatedOffer({
                              ...updatedOffer,
                              time: e.target.value,
                            });
                          }}
                        >
                          <option value="" disabled selected>
                            Time
                          </option>
                          <option value="Full Time Job">Full Time Job</option>
                          <option value="Part Time Job">Part Time Job</option>
                        </select>
                      </td>
                    </div>
                  </tr>

                  <tr>
                    <div className="offer_data">
                      <td>
                        <labael>Name :</labael>
                      </td>
                      <td>
                        <input
                          className="inputt"
                          type="text"
                          name="Name"
                          required={true}
                          value={updatedOffer.Name}
                          onChange={(e) => {
                            setUpdatedOffer({
                              ...updatedOffer,
                              Name: e.target.value,
                            });
                          }}
                        />
                      </td>
                    </div>
                  </tr>
                </table>

                <table>
                  <tr>
                    <div className="offer_data">
                      <td>
                        <label>Description: </label>
                      </td>
                      <td>
                        <input
                          className="inputt"
                          type="text"
                          name="description"
                          required={true}
                          value={updatedOffer.description}
                          onChange={(e) => {
                            setUpdatedOffer({
                              ...updatedOffer,
                              description: e.target.value,
                            });
                          }}
                        />
                      </td>
                    </div>
                  </tr>

                  <tr>
                    <div className="offer_data">
                      <td>
                        <label> skills : </label>
                      </td>
                      <td>
                        <input
                          className="inputt"
                          type="text"
                          name="skills"
                          required={true}
                          value={updatedOffer.skills}
                          onChange={(e) => {
                            setUpdatedOffer({
                              ...updatedOffer,
                              skills: e.target.value,
                            });
                          }}
                        />
                      </td>
                    </div>
                  </tr>

                  <tr>
                    <div className="offer_data">
                      <td>
                        <label>adresse : </label>
                      </td>
                      <td>
                        <input
                          className="inputt"
                          type="text"
                          name="adresse"
                          required={true}
                          value={updatedOffer.adresse}
                          onChange={(e) => {
                            setUpdatedOffer({
                              ...updatedOffer,
                              adresse: e.target.value,
                            });
                          }}
                        />
                      </td>
                    </div>
                  </tr>
                </table>
              </table>

              <button
                type="button"
                className="close_popup"
                onClick={() => toggleModel(null)}
              >
                close
              </button>

              <button className="Save_popup" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GetOffer;
