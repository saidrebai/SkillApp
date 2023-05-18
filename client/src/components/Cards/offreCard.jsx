import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import myImage from "../images/arsela-techmologies.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Card() {
  const user = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const idpdf = localStorage.getItem("idpdf");
  const [offers, setOffers] = useState([]);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const [pdfs, setPdfs] = useState(null);
  const [updatedOffer, setUpdatedOffer] = useState({});
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [users, setUsers] = useState({ cv: [] });

  const toggleModel = (offer) => {
    if (user) {
      setPopup(!popup);
      console.log("gggg", popup);
      setSelectedOffer(offer);
    } else {
      window.location.href = "/login";
    }
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/offerRouter/getoffer"
      );
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

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("pdfs", pdfs);
      formData.append("id", id);
      const submissionSuccessful = await handleUpdate(); // call handleSubmit and store its return value
      if (submissionSuccessful) {
        try {
          const { data: res } = await axios.post(
            "http://localhost:8080/api/uploadRouter/upload",
            formData
          );
          console.log("===>", res);
          localStorage.setItem("idpdf", res.idpdf);
          toast.success("uploaded succesfuly");
          return true;
        } catch (error) {
          if (error.response && error.response.status === 415) {
            toast.error("PDF file only");
          } else {
            console.error(error);
            toast.error("PDF file only");
          }
          return false;
        }
      }
    }
  };

  const handleParse = async (e) => {
    // if (e) {
    //   e.preventDefault();
      const formData = new FormData();
      formData.append("pdfs", pdfs);
      formData.append("id", id);
      // const submissionSuccessful = await handleUpdate(); // call handleSubmit and store its return value
      // if (submissionSuccessful) {
        try {
          const { data: res } = await axios.post(
            "http://localhost:8080/api/uploadRouter/cvParser",
            formData
          );
          console.log("frfr", res);
          localStorage.setItem("skills", res);
          // toast.success("uploaded succesfuly");
          // return true;
        } catch (error) {
          if (error.response && error.response.status === 415) {
            toast.error("PDF file only");
          } else {
            console.error(error);
            toast.error("PDF file only");
          }
          // return false;
        }
      // }
    // }
    console.log("work");
  };

  // const handleGetSkills = async (e) => {
  //   // if (e) {
  //   //   e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("pdfs", pdfs);
  //     formData.append("id", id);
  //     // const submissionSuccessful = await handleUpdate(); // call handleSubmit and store its return value
  //     // if (submissionSuccessful) {
  //       try {
  //         const { data: res } = await axios.post(
  //           "{{baseUrl}}/products/alamakh/resume/:version/predict",
  //           formData
  //         );
  //         console.log("frfr", res);
  //         localStorage.setItem("skills", res);
  //         // toast.success("uploaded succesfuly");
  //         // return true;
  //       } catch (error) {
  //         if (error.response && error.response.status === 415) {
  //           toast.error("PDF file only");
  //         } else {
  //           console.error(error);
  //           toast.error("PDF file only");
  //         }
  //         // return false;
  //       }
  //     // }
  //   // }
  //   console.log("work");
  // };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/offerRouter/updateofferwithid/${updatedOffer._id}`,
        {
          ...updatedOffer,
          user: [...updatedOffer.user, id],
        }
      );
      console.log("lala", response.data);

      setUpdatedOffer(response.data);
      localStorage.setItem("offerId", updatedOffer._id);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Already Deposit")
    }
    return false;
    // }
  };

  const updateUser = async () => {
    const submissionSuccessful = await handleUpdate(); // call handleSubmit and store its return value
    if (submissionSuccessful) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/candidatRouters/updateuserwithcv/${id}`,
          {
            ...users,
            cv: [idpdf],
          }
        );
        console.log("=>", response.data);
        // toast.success("Updated successfully!");
        setUsers(response.data);
        localStorage.setItem("offerId", updatedOffer._id);
        const confirmed = window.confirm(
          "Are you ready to get started with the test ?\n"+
          "the test contain 20 question with one ansewr every 10 sec"
        );
        if (confirmed) {
        window.location = "/answerquiz";
        }
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (selectedOffer) {
      setUpdatedOffer(selectedOffer);
    }
  }, [selectedOffer]);

  const handleFileChange = (event) => {
    setPdfs(event.target.files[0]);
  };

  return (
    <>
      <div className="container">
        <table>
          <tr className="table1">
            {currentOffers.length > 0 ? (
              currentOffers.map((selectedOffer) => (
                <div className="offer_container" key={selectedOffer._id}>
                  <div className="offer_container_img">
                    <img src={myImage} alt="" />
                  </div>
                  {/* <label className="offre_label">information : </label> */}
                  <div className="offer_container_info">
                    <label className="offre_label">Title : </label>
                    {selectedOffer.Name}
                  </div>
                  <div className="offer_container_info">
                    <label className="offre_label">Type : </label>
                    {selectedOffer.type}
                  </div>
                  <div className="offer_container_info">
                    <label className="offre_label">Time : </label>
                    {selectedOffer.time}
                  </div>

                  <div className="offer_container_description">
                    <label className="offre_label">Descritption : </label>
                    {selectedOffer.description}
                  </div>

                  <div className="skills_container">
                    <label className="offre_label">Skills : </label>
                    {selectedOffer.skills}
                  </div>

                  <div className="company_Name_container">
                    <label className="offre_label">Entreprise : </label>
                    {selectedOffer.company_name}
                  </div>

                  <div className="adresse_container">
                    <label className="offre_label">Adresse : </label>
                    {selectedOffer.adresse}
                  </div>
                  <button
                    className="apply_button"
                    onClick={() => {
                      toggleModel(selectedOffer);
                    }}
                  >
                    Apply
                  </button>
                  {popup && (
                    <div className="popup_container" style={{ zIndex: "1" }}>
                      <div
                        className="overlay"
                        onClick={() => toggleModel(null)}
                      ></div>
                      <form
                        className="form_container"
                        method="POST"
                        onSubmit={handleSubmit}
                      >
                        <div className="popup_contnt">
                          <div
                            className="popup_id"
                            value={updatedOffer?._id}
                          ></div>
                          <h2 className="h1_cv">Enter your CV here : </h2>
                          <input
                            type="file"
                            name="pdfs"
                            onChange={handleFileChange}
                            required
                          />
                          <button
                            className="close_popup"
                            type="button"
                            onClick={() => {
                              toggleModel();
                              // updateUser();
                            }}
                          >
                            Close
                          </button>
                          {error && <div className="error_msg">{error}</div>}
                          <button
                            className="submit_button"
                            type="submit"
                            onClick={() => {
                              // handleUpdate();
                              updateUser();
                              handleParse();
                              // handleGetSkills();
                            }}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                      <ToastContainer />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </tr>
        </table>
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
    </>
  );
}
