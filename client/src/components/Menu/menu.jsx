import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";
import LogoutIcon from '@mui/icons-material/Logout';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from "axios";

function ResponsiveAppBar() {
  const ids = localStorage.getItem("id");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [notification, setNotification] = useState([]);
  const [numberNot, setNumberNot] = useState(0);
  const [clicket, setClicked] = useState(true);

  const isAdmin = localStorage.getItem("isAdmin");
  const firstName = localStorage.getItem("firstName");
  const token = localStorage.getItem("token");
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };
  const handleAccountClick = () => {
    if (isAdmin === "false") {
      window.location.href = "/Account";
    } else {
      window.location.href = "/AccountA";
    }
  };

  const handleAppClick = () => {
    window.location.href = "/candidacy";
  };

  const handlelogoutClick = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("ids");
  };
  const handleHomeClick = () => {
    window.location.href = "/";
    const homeSection = document.getElementById("home");
    homeSection.scrollIntoView({ behavior: "smooth" });
  };
  const handleAboutusClick = () => {
    const aboutusSection = document.getElementById("aboutus");
    aboutusSection.scrollIntoView({ behavior: "smooth" });
  };
  const handleOffersClick = () => {
    window.location.href = "/offers";
  };
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar() {
    return {
      sx: {
        bgcolor: stringToColor(firstName),
      },
      children: `${firstName.split(" ")[0][0].toUpperCase()}`,
    };
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(false)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8080/api/contactRouter/getcontactbycandidat/${ids}`
      );
      setNotification(response.data.contact);
      console.log("heere", response.data.contact);
      setNumberNot(response.data.nbreContact);
      console.log("num", response.data.contact.length);
    }
    fetchData();
  }, []);
  // console.log("not",notification);

  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + "...";
    }
  }
  return (
    <>
      <div className="menu_container">
        <Container maxWidth="xl">
          <div className="menu_container_text">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#000000",
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                Skills
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem key="Home" onClick={handleHomeClick} href="#home">
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem
                    key="Aboutus"
                    onClick={handleAboutusClick}
                    href="#About_us"
                  >
                    <Typography textAlign="center">About us</Typography>
                  </MenuItem>
                  {(!isAdmin || isAdmin === "false") && !isSuperAdmin && (
                    <MenuItem key="Offers" onClick={handleOffersClick}>
                      <Typography textAlign="center">Offers</Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    key="Contact"
                    onClick={handleContactClick}
                    href="#Contact"
                  >
                    <Typography textAlign="center">Contact</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Skills
              </Typography>
              <Box
                className="pages"
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                <MenuItem key="Home" onClick={handleHomeClick}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key="Aboutus" onClick={handleAboutusClick}>
                  <Typography textAlign="center">About us</Typography>
                </MenuItem>
                {(isAdmin === "false" || !isAdmin) && !isSuperAdmin && (
                  <MenuItem key="Offers" onClick={handleOffersClick}>
                    <Typography textAlign="center">Offers</Typography>
                  </MenuItem>
                )}
                <MenuItem key="Contact" onClick={handleContactClick}>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Box>

              {token && isAdmin === "false" && (
                <div className="notification" 
                >
                  <IconButton
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                  >
                    {clicket && (
                    <Badge badgeContent={numberNot} color="secondary" style={{marginRight:"-20px",marginTop:'-20px'}}/>
                    )}
                    <NotificationsOutlinedIcon />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <h1 className="notifi">Notifications</h1>
                    <Typography className="nots" sx={{ p: 1 }}>
                      {notification?.map((not) => (
                        <div className="msg" key={not?._id}>
                          <p className="linke">
                            {" "}
                            you have recived an email from : {not.adminEmail}
                          </p>
                          <p className="link">{truncateText(not?.link, 50)}</p>
                          <p>Check your email</p>
                        </div>
                      ))}
                    </Typography>
                  </Popover>
                </div>
              )}

              {!token && (
                <button className="title_signin" onClick={handleLoginClick}>
                  SIGN IN
                </button>
              )}
              <Box sx={{ flexGrow: 0 }}>
                {token && (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Stack direction="row" spacing={2}>
                        <Avatar {...stringAvatar()} />
                      </Stack>
                    </IconButton>
                  </Tooltip>
                )}

                {/* <div className="name">{firstName}</div> */}

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
                  {!isSuperAdmin && isAdmin === "false" && (
                    <MenuItem key="Account" onClick={handleAccountClick}>
                      <AccountCircleOutlinedIcon className="icns"/>
                      <Typography textAlign="center">Profil</Typography>
                    </MenuItem>
                  )}

                  {isAdmin === "false" && (
                    <MenuItem key="application" onClick={handleAppClick}>
                      <ContentPasteOutlinedIcon className="icns"/>
                      <Typography textAlign="center">
                        my Applications
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem key="logout" onClick={handlelogoutClick}>
                    <LogoutIcon className="icns"/>
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
export default ResponsiveAppBar;
