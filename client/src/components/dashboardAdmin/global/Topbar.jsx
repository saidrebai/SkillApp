import * as React from "react";
import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const handlelogoutClick = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("ids");
  };



  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        height="50px"
      >
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="logout">
              <IconButton onClick={handlelogoutClick}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Box>
    </Box>
  );
};

export default Topbar;
