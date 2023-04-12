import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";

function ResponsiveApp() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isAdmin = localStorage.getItem("isAdmin");
  const firstName = localStorage.getItem("firstName");
  const token = localStorage.getItem("token");
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAccountClick = () => {
    if (isAdmin === "false") {
      window.location.href = "/Account";
    } else {
      window.location.href = "/AccountA";
    }
  };
  const handleDashboardClick = () => {
    window.location.href = "/dashboardA";
  };
  const handlelogoutClick = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("isSuperAdmin");
  };

  return (
    <>
      <div className="menu_container">
        <Container maxWidth="xl">
          <div className="menu_container_text">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 0 }}>
                {token && (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src="/broken-image.jpg" />
                    </IconButton>
                  </Tooltip>
                )}

                <div className="name">{firstName}</div>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!isSuperAdmin && (
                    <MenuItem key="Account" onClick={handleAccountClick}>
                      <Typography textAlign="center">Account</Typography>
                    </MenuItem>
                  )}
                  {isAdmin === "true" && (
                    <MenuItem key="Dashboard" onClick={handleDashboardClick}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  )}
                  <MenuItem key="logout" onClick={handlelogoutClick}>
                    <Typography textAlign="center">logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </div>
        </Container>
      </div>
    </>
  );
}
export default ResponsiveApp;
