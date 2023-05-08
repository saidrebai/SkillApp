import * as React from "react";
import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlelogoutClick = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("ids");
  };

  const handleNotificationClick = (event) => {
    setNotificationsOpen(!notificationsOpen);
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationsOpen(false);
    setAnchorEl(null);
  };
  const notifications = [
    {
      id: 1,
      text: "New order received",
      date: "2023-05-07T09:30:00Z",
    },
    {
      id: 2,
      text: "New message from customer",
      date: "2023-05-06T15:20:00Z",
    },
    {
      id: 3,
      text: "Server maintenance scheduled for next week",
      date: "2023-05-05T13:15:00Z",
    },
  ];

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        height="50px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={handleNotificationClick}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <Popper open={notificationsOpen} anchorEl={anchorEl}>
          <Paper>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemText
                    primary={notification.text}
                    secondary={new Date(notification.date).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>

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
