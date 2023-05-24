import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Recrutments() {
  const id = localStorage.getItem("id");

  const [application, setApplication] = useState([]);
  const [countScores, setCountScores] = useState(0);
  const [idOffer, setIdOffer] = useState([]);
  const [users, setUsers] = useState([]);

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

        console.log("psps", idUsers);
        setApplication(responseScores.data?.scores);
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

  return (
    <>
      <div className="s_container">
        <div className="tables">
          <h1 className="status">Accepted</h1>
          <div className="score_c">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell >Email</TableCell>
                    <TableCell align="right">
                      Offer
                    </TableCell>
                    <TableCell align="right">
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {application?.map((app, _id) => {
                    if (app.accepted == true) {
                      return (
                        <TableRow key={app._id}>
                          <TableCell component="th" scope="row">
                            {users.find((user) => user._id === app.user)?.email}
                          </TableCell>
                          <TableCell align="right">
                            {
                              idOffer.find((offer) => offer._id === app.offer)
                                ?.Name
                            }
                          </TableCell>
                          <TableCell align="right">{app.result}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="tables">
          <h1 className="status">Refused</h1>
          <div className="score_c">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Offer</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {application?.map((app, _id) => {
                    if (app.refused === true) {
                      return (
                        <TableRow key={app._id}>
                          <TableCell component="th" scope="row">
                            {users.find((user) => user._id === app.user)?.email}
                          </TableCell>
                          <TableCell align="right">
                            {
                              idOffer.find((offer) => offer._id === app.offer)
                                ?.Name
                            }
                          </TableCell>
                          <TableCell align="right">{app.result}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}
