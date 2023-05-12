import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStoreIndicator from "react-score-indicator";
import "./index.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Score() {

  const id = localStorage.getItem("id");

  const [scores, setScores] = useState([]);
  const [countScores, setCountScores] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [idOffer, setIdOffer] = useState([]);
  const [users, setUsers] = useState([]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(scores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScores = scores.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };



useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/offerRouter/getofferbyid/${id}`
      );
      const idOffers = response.data.offer.map((offer) => offer._id).join(",");
      const responseScores = await axios.get(
        "http://localhost:8080/api/scoreRouter/getscorebyid",
        { params: { q: idOffers } }
      );
      const idUsers = responseScores.data?.scores?.map((score)=> score.user).join(",");
      const responseUser = await axios.get(
        "http://localhost:8080/api/candidatRouters/searchuser",
        { params: { q: idUsers } }
      )
      console.log("psps",idUsers);
      setScores(responseScores.data?.scores);
      setCountScores(responseScores.data?.scoreCount);
      setIdOffer(response.data.offer);
      setUsers(responseUser.data?.data)
      console.log(users);
      console.log(idOffer);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}, []);


  return (
    <>
      <div className="s_container">
        <div className="score_container">
          {/* <div>{idOffer._id}</div> */}
          {currentScores.length > 0 ? (
            currentScores.map((score) => (
              <div className="score" key={score._id}>
                {
                  <ReactStoreIndicator
                    value={score.result}
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
                }
                <h3>{idOffer.find((offer) => offer._id === score.offer)?.Name}</h3>
                <h3>{users.find((user) => user._id === score.user)?.email}</h3>
              </div>
            ))
          ) : (
            <div></div>
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
}
