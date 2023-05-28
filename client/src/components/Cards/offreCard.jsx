import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import myImage from "../images/Fotolia_177831790_Subscription_Monthly_M-1024x682.jpg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import TitleIcon from "@mui/icons-material/Title";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import RadarOutlinedIcon from "@mui/icons-material/RadarOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
  const [isSubmited, setSubmited] = useState(false);
  const [isOfferUpdated, setIsOfferUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnalyse, setIsAnalyse] = useState(false);
  const [search, setSearch] = useState("");

  const itemsPerPage = 6;
  const totalPages = Math.ceil(offers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOffers = offers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("pdfs", pdfs);
      formData.append("id", id);
      try {
        const { data: res } = await axios.post(
          "http://localhost:8080/api/uploadRouter/upload",
          formData
        );
        console.log("===>", res);
        localStorage.setItem("idpdf", res.idpdf);
        setSubmited(true);
        toast.success("uploaded succesfuly");
      } catch (error) {
        if (error.response && error.response.status === 415) {
          toast.error("PDF file only");
        } else {
          console.error(error);
          toast.error("err");
        }
      }
    }
  };
  console.log("sub is", isSubmited);
  useEffect(() => {
    const handleUpdate = async () => {
      console.log("submit is ", isSubmited);
      if (isSubmited) {
        try {
          const response = await axios.put(
            `http://localhost:8080/api/offerRouter/updateofferwithid/${updatedOffer._id}`,
            {
              ...updatedOffer,
              user: [...updatedOffer.user, id],
            }
          );
          console.log("offer updated", response?.data?.offer);
          setIsOfferUpdated(true);
          setUpdatedOffer(response?.data?.offer);
          localStorage.setItem("offerId", updatedOffer._id);
          setOfferId(updatedOffer._id);
        } catch (error) {
          console.error(error);
          toast.error("Already Deposit");
          setSubmited(false);
          setIsOfferUpdated(false);
        }
      }
    };
    handleUpdate();
  }, [isSubmited]);

  useEffect(() => {
    const updateUser = async () => {
      if (isSubmited && isOfferUpdated) {
        try {
          const response = await axios.put(
            `http://localhost:8080/api/candidatRouters/updateuserwithcv/${id}`,
            {
              ...users,
              cv: [idpdf],
            }
          );
          console.log("=>", response.data);
          setUsers(response.data);
          localStorage.setItem("offerId", updatedOffer._id);
          // localStorage.removeItem("idpdf");
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateUser();
  }, [isSubmited, isOfferUpdated]);

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const handleParse = async (e) => {
      const formData = new FormData();
      formData.append("pdfs", pdfs);
      formData.append("id", id);
      if (isSubmited && isOfferUpdated) {
        try {
          setLoading(true);
          const { data: res } = await axios.post(
            "http://localhost:8080/api/uploadRouter/cvParser",
            formData
          );
          console.log("frfr", res);
          localStorage.setItem("skills", res.skills);
          setSkills(res.skills);
          setIsAnalyse(true);
          if (res) {
            setLoading(false);
          }
          // const confirmed = window.confirm(
          //   "Are you ready to get started with the test ?\n" +
          //     "the test contain 20 question with one ansewr every 10 sec"
          // );

          // if (confirmed) {
          //   window.location = "/answerquiz";
          // }
        } catch (error) {
          if (error.response && error.response.status === 415) {
            toast.error("PDF file only");
          } else {
            console.error(error);
            toast.error("PDF file only");
          }
        }
      }
    };

    handleParse();
  }, [isSubmited, isOfferUpdated]);

  const [offerId, setOfferId] = useState({});
  const [competence, setCompetence] = useState({});
  const [skills, setSkills] = useState({});

  useEffect(() => {
    async function confirme() {
      if (isSubmited && isOfferUpdated && isAnalyse) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/offerRouter/getoffebyid/${offerId}`
          );
          setCompetence(response?.data?.offer?.skills);
          console.log("==>", response.data.offer.skills);
          const comp = response?.data?.offer?.skills;
          setSubmited(false);
          setIsOfferUpdated(false);
          setIsAnalyse(false);
          if (skills.includes(comp)) {
            const confirmed = window.confirm(
              "Are you ready to get started with the test ?\n" +
                "the test contain 20 question with one ansewr every 10 sec"
            );

            if (confirmed) {
              window.location = "/answerquiz";
            } else {
              toggleModel(false);
            }
          } else {
            alert("you do not have the necessary skills!\n try another offer");
          }
        } catch (error) {
          if (error.response && error.response.status === 415) {
            toast.error("PDF file only");
          } else {
            console.error(error);
            toast.error("PDF file only");
          }
        }
        console.log("work", isSubmited);
        console.log("go", isOfferUpdated);
      }
    }

    confirme();
  }, [isSubmited, isOfferUpdated, isAnalyse]);

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
        <div className="search_containe">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                className="search_input"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          </Search>
        </div>
        <table>
          <tr className="table1">
            {currentOffers.length > 0 ? (
              currentOffers
                .filter((selectedOffer) => {
                  return search.toLowerCase() === ""
                    ? selectedOffer
                    : selectedOffer.Name.toLowerCase().includes(search);
                })
                .map((selectedOffer) => (
                  <div className="offer_container" key={selectedOffer._id}>
                    <div className="offer_container_img">
                      <img src={myImage} alt="" />
                    </div>
                    <div className="offer_container_info">
                      <label className="offre_label">
                        {" "}
                        <TitleIcon /> Title :{" "}
                      </label>

                      {selectedOffer.Name}
                    </div>
                    <div className="offer_container_info">
                      <label className="offre_label">
                        <PermIdentityOutlinedIcon /> Position :{" "}
                      </label>
                     {selectedOffer.type}
                    </div>
                    <div className="offer_container_info">
                      <label className="offre_label">
                        <AccessTimeIcon /> Time :{" "}
                      </label>

                      {selectedOffer.time}
                    </div>

                    <div className="offer_container_description">
                      <label className="offre_label">
                        <DescriptionOutlinedIcon /> Descritption :{" "}
                      </label>

                      {selectedOffer.description}
                    </div>

                    <div className="skills_container">
                      <label className="offre_label">
                        <RadarOutlinedIcon /> Skills :{" "}
                      </label>

                      {selectedOffer.skills}
                    </div>

                    <div className="company_Name_container">
                      <label className="offre_label">
                        <ApartmentOutlinedIcon /> Entreprise :{" "}
                      </label>

                      {selectedOffer.company_name}
                    </div>

                    <div className="adresse_container">
                      <label className="offre_label">
                        <LocationOnOutlinedIcon /> Adresse :
                      </label>

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
                        {isLoading ? (
                          <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                          </Box>
                        ) : null}
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
                                // updateUser();
                                // onClickButton();
                                // handleParse();
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
}
