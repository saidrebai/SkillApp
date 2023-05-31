import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStoreIndicator from "react-score-indicator";
import "./index.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

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

export default function Application() {
  const id = localStorage.getItem("id");

  const [scores, setScores] = useState([]);
  const [countScores, setCountScores] = useState(0);

  const [idOffer, setIdOffer] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);
  const [application, setApplication] = useState({});

  const [refused, setRefused] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);

  const [idUser, setIdUser] = useState();
  const [email, setEmail] = useState("");
  const [scoreForMail, setScoreForMail] = useState(null);
  const [offer, setOffer] = useState("");
  const [adminEmail, setadminEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(scores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = scores.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleModal = (score) => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const handleTimeChange = (time) => {
  //   setSelectedTime(time);
  // };
  // const itemsPerPage = 6;
  // const totalPages = Math.ceil(scores.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentScores = scores.slice(startIndex, endIndex);

  // const handlePageChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/offerRouter/getofferbyid/${id}`
        );
        const idOffers = response.data.offer
          .map((offer) => offer._id)
          .join(",");
        const responseScores = await axios.get(
          "http://localhost:8080/api/ApplicationRouter/getscorebyid",
          { params: { q: idOffers } }
        );
        const idUsers = responseScores.data?.scores
          ?.map((score) => score.user)
          .join(",");
        const responseUser = await axios.get(
          "http://localhost:8080/api/candidatRouters/searchuser",
          { params: { q: idUsers } }
        );
        const idAdmin = localStorage.getItem("id");

        const adminInfo = await axios.get(
          `http://localhost:8080/api/adminRouters/getinfoAdmin/${idAdmin}`
        );
        setadminEmail(adminInfo.data.data.email);

        console.log("psps", idUsers);
        setScores(responseScores.data?.scores);
        setCountScores(responseScores.data?.scoreCount);
        setIdOffer(response.data.offer);
        setUsers(responseUser.data?.data);
        console.log(users);
        console.log(idOffer);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  // console.log("currentScores",currentScores);

  const accepterCandidat = async () => {
    console.log("dkhalna", email, scoreForMail, offer, adminEmail, idUser);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/contactRouter/accepterCandidatPR`,
        {
          email,
          score: scoreForMail,
          offer,
          adminEmail,
          date: selectedDate,
          user: idUser,
        }
      );

      console.log(response.data);
      toast.success("email sent succesfully");
    } catch (error) {
      console.error(error);
      toast.error("failed");
    }
  };
  // console.log(email, scoreForMail, offer, adminEmail, date);
  const rejeterCandidat = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/contactRouter/refuserCandidatPR`,
        {
          email,
          score: scoreForMail,
          offer,
          adminEmail,
        }
      );

      console.log(response.data); // Display the server response
      console.log("waaaaa", offer);
      toast.success("email sent succesfully");
    } catch (error) {
      console.error(error); // Display the error in case of a problem
      toast.error("failed");
    }
  };

  useEffect(() => {
    console.log("offer tbadel", offer);
  }, [offer]);

  const acceptCandidacy = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/ApplicationRouter/updateUser/${userId}`
      );
      setApplication(response?.data);
      console.log("candidacy accepted", response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const refuseCandidacy = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/ApplicationRouter/refuseUser/${userId}`
      );
      setRefused(response?.data);
      console.log("candidacy refused", response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="s_container">
        <ToastContainer />
        <div className="search_container">
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
        <div className="score_container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Offer</TableCell>
                  <TableCell align="right">Accepted</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scores
                   ?.filter((score) => {
                    const searchValue = search.toLowerCase();
                    const resultValue = score?.result;
                    return searchValue === "" ? score : resultValue >= parseInt(searchValue);
                  })
                  .map((score, _id) => {
                    if (!score.accepted && !score.refused) {
                      return (
                        <TableRow key={score._id}>
                          <TableCell component="th" scope="row">
                            {
                              users.find((user) => user._id === score.user)
                                ?.email
                            }
                          </TableCell>
                          <TableCell align="right">
                            {
                              idOffer.find((offer) => offer._id === score.offer)
                                ?.Name
                            }
                          </TableCell>
                          <TableCell align="right">
                            {score.accepted === true ? (
                              <div>true</div>
                            ) : (
                              <div>false</div>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {modal && (
                              <div
                                className="popup_container"
                                style={{ zIndex: "1" }}
                                key={_id}
                              >
                                <div
                                  className="overlay"
                                  onClick={() => toggleModal(null)}
                                ></div>
                                <div className="modal_content" key={score._id}>
                                  <div className="score" key={score._id}>
                                    <ReactStoreIndicator
                                      value={selectedScore.result}
                                      maxValue={20}
                                      stepColors={[
                                        "#271a1a",
                                        "#ed8d00",
                                        "#f1bc00",
                                        "#84c42b",
                                        "#53b83a",
                                        "#3da940",
                                        "#3da940",
                                        "#3da940",
                                      ]}
                                      style={{ color: "#aaa" }}
                                    />
                                    {console.log("score selected == >", score)}

                                    <button
                                    className="accept_button"
                                      onClick={() => {
                                        accepterCandidat();
                                        toggleModal();
                                        acceptCandidacy(score._id);
                                      }}
                                    >
                                      Accepte
                                    </button>
                                    <button
                                    className="refuse_button"
                                      onClick={() => {
                                        rejeterCandidat();
                                        toggleModal();
                                        refuseCandidacy(score._id);
                                      }}
                                    >
                                      Rejecte
                                    </button>
                                  </div>
                                  <div className="datepicker_container">
                                    <DatePicker
                                      // type="date"
                                      selected={selectedDate}
                                      onChange={handleDateChange}
                                      dateFormat="yyyy-MM-dd              HH:mm aa"
                                      showTimeInput
                                      placeholderText="Select a date and time"
                                      className="input__date"
                                      // disabled={!selectedDate}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                            <button
                              className="dsply_btn"
                              onClick={() => {
                                toggleModal(score);
                                setSelectedScore(score);
                                setEmail(
                                  users.find((user) => user._id === score.user)
                                    ?.email
                                );
                                setIdUser(
                                  users.find((user) => user._id === score.user)
                                    ?._id
                                );
                                setScoreForMail(score.result);
                                setOffer(
                                  idOffer.find(
                                    (offer) => offer._id === score.offer
                                  )?.Name
                                );
                              }}
                            >
                              display
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>{" "}
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
      </div>
    </>
  );
}
