import React from "react";
import "./index.css";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../dashboardAdmin/components/Header";
// import LineChart from "../../dashboardAdmin/components/LineChart";
// import BarChart from "../../dashboardAdmin/components/BarChart";
import StatBox from "../../dashboardAdmin/components/StatBox";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useState, useEffect } from "react";
// import ProgressCircle from "../../components/ProgressCircle";
import axios from "axios";

const DashboardA = () => {
  const id = localStorage.getItem("id");
  const ids = localStorage.getItem("ids");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [offersCount, setOffersCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [pdfCount, setPdfCount] = useState(0);
  const [countScores, setCountScores] = useState(0);
  const [offerId, setOfferId] = useState({});
  const [isTrue, setIsTrue] = useState(false);
  const [users, setUsers] =useState ({})

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8080/api/offerRouter/getofferbyid/${id}`
      );
      const idOffers = response.data.offer.map((offer) => offer._id).join(",");
      setOfferId(idOffers);
      console.log("vvvv",idOffers);
      setIsTrue(true);
      const responseScores = await axios.get(
        "http://localhost:8080/api/ApplicationRouter/getscoresbyid",
        { params: { q: idOffers } }
      );
      setCountScores(responseScores?.data?.scoreCount);
      console.log("pchpah",responseScores?.data?.scoreCount);
      setOffersCount(response.data?.offer?.length);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isTrue) {
        const response = await axios.get(
          "http://localhost:8080/api/offerRouter/countuserbyofferid",
          { params: { q: offerId } }
        );
        setUserCount(response?.data?.count);
        const idUsers = response?.data?.result?.map((user) => user?.uniqueUserIds)?.join(",");
        console.log("user=====>",idUsers);
        setUsers(idUsers)
        console.log("ff", response?.data?.count);
      }
    }
    fetchData();
  }, [isTrue]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/uploadRouter/pdfs",
        { params: { q: users } }
      );
      setPdfCount(response?.data?.pdfcount);
      console.log(response?.data?.pdfcount);
    }
    fetchData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={offersCount}
            subtitle="Offers"
            progress="0.75"
            increase="+14%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userCount}
            subtitle="Candidats"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={pdfCount}
            subtitle="CV"
            progress="0.50"
            increase="+21%"
            icon={
              <ContactPageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countScores}
            subtitle="Applications"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="1000"
                color={colors.greenAccent[500]}
              >
                Power BI Dashboard
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <div className="powerbi">
            <iframe
              title="pfe"
              width="1140"
              height="700"
              src="https://app.powerbi.com/reportEmbed?reportId=08f07807-81fb-4e2f-991e-bd7ecffbcd6b&autoAuth=true&ctid=dbd6664d-4eb9-46eb-99d8-5c43ba153c61"
              frameborder="0"
              allowFullScreen="true"
            ></iframe>
          </div>
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default DashboardA;
