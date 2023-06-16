import React from "react";
import "./index.css";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../dashboardAdmin/components/Header";


const DashboardA = () => {
  const id = localStorage.getItem("id");


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  const reportURL = `https://app.powerbi.com/reportEmbed?reportId=bd9f6d82-454b-4057-a402-77f504ec6824&autoAuth=true&ctid=dbd6664d-4eb9-46eb-99d8-5c43ba153c61&filter=offermodels/admin eq '${id}'`;
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
       
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="20px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
    <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

          </Box>
          <div className="powerbi">
            <iframe
              src={reportURL}
              title="Final BI"
              width="1140"
              height="541.25"
              frameborder="0"
              allowFullScreen="true"
            ></iframe>
          </div>
        </Box>

      </Box>
    </Box>
  );
};

export default DashboardA;
