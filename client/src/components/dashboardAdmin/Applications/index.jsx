import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStoreIndicator from "react-score-indicator";
import "./index.css";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Application() {
  const id = localStorage.getItem("id");

  const [scores, setScores] = useState([]);
  const [countScores, setCountScores] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [idOffer, setIdOffer] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);
  const [application, setApplication] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [email, setEmail] = useState("");
  const [scoreForMail, setScoreForMail] = useState(null);
  const [offer, setOffer] = useState("");
  const [adminEmail, setadminEmail] = useState("");

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
    console.log("dkhalna", email, scoreForMail, offer, adminEmail);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/adminRouters/accepterCandidatPR`,
        {
          email,
          score: scoreForMail,
          offer,
          adminEmail,
          date: selectedDate,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(email, scoreForMail, offer, adminEmail, date);
  const rejeterCandidat = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/adminRouters/refuserCandidatPR`,
        {
          email,
          score: scoreForMail,
          offer,
          adminEmail,
        }
      );

      console.log(response.data); // Display the server response
      console.log("waaaaa", offer);
    } catch (error) {
      console.error(error); // Display the error in case of a problem
    }
  };

  useEffect(() => {
    console.log("offer tbadel", offer);
  }, [offer]);

  const updateCandidacy = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/ApplicationRouter/updateUser/${userId}`
      );
      setApplication(response?.data);
      console.log("candidacy updated", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="s_container">
        <div className="score_container">
          {/* <div>{idOffer._id}</div> */}
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
                {scores?.map((score, _id) => (
                  <TableRow key={score._id}>
                    <TableCell component="th" scope="row">
                      {users.find((user) => user._id === score.user)?.email}
                    </TableCell>
                    <TableCell align="right">
                      {idOffer.find((offer) => offer._id === score.offer)?.Name}
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
                                onClick={() => {
                                  accepterCandidat();
                                  toggleModal();
                                  updateCandidacy(
                                    users.find(
                                      (user) => user._id === score.user
                                    )?._id
                                  );
                                }}
                              >
                                Accepte
                              </button>
                              <button  
                                onClick={() => {
                                  rejeterCandidat();
                                  toggleModal();
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
                            users.find((user) => user._id === score.user)?.email
                          );
                          setScoreForMail(score.result);
                          setOffer(
                            idOffer.find((offer) => offer._id === score.offer)
                              ?.Name
                          );
                        }}
                      >
                        display
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* <div className="pagination_container">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div> */}
      </div>
    </>
  );
}
