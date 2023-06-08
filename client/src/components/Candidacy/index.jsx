import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import myImg from "../images/accompagnement_recrutement.png";
import img from "../images/shutterstock_1040718631-1-1024x878.jpg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";

const Candidacy = () => {
  const id = localStorage.getItem("id");

  const [candidacy, setCandidacy] = useState([]);
  const [offer, setOffer] = useState([]);

  console.log("ccc", candidacy);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/ApplicationRouter/getappbyuser/${id}`
        );
        setCandidacy(response?.data?.Candidacy);
        console.log("response", response.data);
        const idOffers = response.data.Candidacy.map(
          (candidacy) => candidacy.offer
        ).join(",");
        console.log("offers", idOffers);
        const responseOffer = await axios.get(
          "http://localhost:8080/api/offerRouter/getofferbyids",
          { params: { q: idOffers } }
        );
        setOffer(responseOffer.data.offers);
        console.log("off", offer);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const steps = ["Applied ", "Quiz Completed", "Accepted"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(candidacy?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const application = candidacy?.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const step = (acc) => {
    if (acc === false) {
      return 2;
    }
    return 3;
  };

  const getStepColor = (accepted, refused, theme) => {
    if (refused === true) {
      return theme?.palette?.error?.main; // Red color for refused
    }
    if (accepted === true) {
      return theme?.palette?.success?.main; // Green color for accepted
    }
    return theme?.palette?.primary?.main; // Default color for other steps
  };

  const CustomStepper = styled(Stepper)(({ theme }) => ({
    "& .MuiStepLabel-active": {
      color: (props) => getStepColor(props?.accepted, props?.refused, theme),
    },
    "& .MuiStepIcon-active": {
      color: (props) => getStepColor(props?.accepted, props?.refused, theme),
    },
    "& .MuiStepIcon-text": {
      fill: "#fff",
    },
  }));

  return (
    <>
      <div className="candidacy_container">
        <img className="first_img" src={myImg} alt="" />
        {application?.map((cand) => (
          <div className="application" key={cand._id}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                marginBottom: "20px",
                marginTop: "80px",
                width: 1200,
                flexGrow: 1,
                className:"app_paper",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={img} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {offer.find((offer) => offer._id === cand.offer)?.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {
                          offer.find((offer) => offer._id === cand.offer)
                            ?.company_name
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Address:{" "}
                        {
                          offer.find((offer) => offer._id === cand.offer)
                            ?.address
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        <Box sx={{ width: "100%" }}>
                          <CustomStepper
                            activeStep={step(cand.accepted)}
                            alternativeLabel
                            accepted={cand?.accepted}
                            refused={cand?.refused}
                          >
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </CustomStepper>
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      SCORE: {cand.result}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
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
};

export default Candidacy;
