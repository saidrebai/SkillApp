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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Recrutments() {
  const id = localStorage.getItem("id");

  const [acceptedApplication, setAcceptedApplication] = useState([]);
  const [refusedApplication, setRefusedApplication] = useState([]);
  const [countScores, setCountScores] = useState(0);
  const [idOffer, setIdOffer] = useState([]);
  const [users, setUsers] = useState([]);
  const [emailUser, setEmailUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCurrentPage, setIsCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(acceptedApplication.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAcceptedApplications = acceptedApplication.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const itemsPerPag = 8;
  const totalPage = Math.ceil(refusedApplication.length / itemsPerPag);
  const startInde = (isCurrentPage - 1) * itemsPerPag;
  const endInde = startInde + itemsPerPag;
  const currentRefusedApplication = refusedApplication.slice(startInde, endInde);

  const handleNextPage = (event, value) => {
    setIsCurrentPage(value);
  };

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
          "http://localhost:8080/api/ApplicationRouter/getaccappsbyoffers",
          { params: { q: idOffers } }
        );
        const idUsers = responseScores.data?.scores
          ?.map((score) => score.user)
          .join(",");
          const responseRefApp = await axios.get(
            "http://localhost:8080/api/ApplicationRouter/getrefappsbyoffers",
            { params: { q: idOffers } }
          );
          const idUserss = responseRefApp.data?.scores
            ?.map((score) => score.user)
            .join(",");
            const joinedIds = idUsers + (idUsers && idUserss ? "," : "") + idUserss;
        const responseUser = await axios.get(
          "http://localhost:8080/api/candidatRouters/searchuser",
          { params: { q: joinedIds } }
        );
        const emails = responseUser.data?.data
          ?.map((app) => app.email)
          .join(",");
        console.log("emails==>", emails);

        const responseEmail = await axios.get(
          "http://localhost:8080/api/contactRouter/getcontactbyemail",
          { params: { q: emails } }
        );
        setEmailUser(responseEmail?.data.contact);
        console.log("em==>", emailUser);

        console.log("psps", idUsers);
        setAcceptedApplication(responseScores?.data?.scores);
        setRefusedApplication(responseRefApp?.data?.scores);
        setCountScores(responseScores.data?.scoreCount);
        setIdOffer(response.data.offer);
        setUsers(responseUser.data.data);
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
      <div className="sx_container">
        <div className="tables">
          <h1 className="status">Accepted</h1>
          <div className="score_c">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Offer</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="center">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentAcceptedApplications?.map((app, _id) => {
                    // if (app.accepted === true) {
                      return (
                        <TableRow key={app._id}>
                          <TableCell component="th" scope="row">
                            {users.find((user) => user._id === app.user)?.email}
                          </TableCell>
                          <TableCell align="right">
                            {
                              idOffer.find((offer) => offer._id === app.offer)
                                ?.name
                            }
                          </TableCell>
                          <TableCell align="right">{app.result}</TableCell>
                          <TableCell align="right">
                            <TableCell align="right">
                              {
                                emailUser?.find(
                                  (email) => email.user === app.user
                                )?.date
                              }
                            </TableCell>
                          </TableCell>
                        </TableRow>
                      );
                    // }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
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
                  {currentRefusedApplication?.map((app, _id) => {
                    // if (app.refused === true) {
                      return (
                        <TableRow key={app._id}>
                          <TableCell component="th" scope="row">
                            {users.find((user) => user._id === app.user)?.email}
                          </TableCell>
                          <TableCell align="right">
                            {
                              idOffer.find((offer) => offer._id === app.offer)
                                ?.name
                            }
                          </TableCell>
                          <TableCell align="right">{app.result}</TableCell>
                        </TableRow>
                      );
                    // }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="pagination_container">
              <Stack spacing={2}>
                <Pagination
                  count={totalPage}
                  page={isCurrentPage}
                  onChange={handleNextPage}
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
