import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
                    <Typography textAlign="center" >Home</Typography>
                  </MenuItem>
                  <MenuItem key="Aboutus" onClick={handleAboutusClick} href="#About_us">
                    <Typography textAlign="center" >About us</Typography>
                  </MenuItem>
                  {(!isAdmin || isAdmin === "false") && (!isSuperAdmin) && (
                    <MenuItem key="Offers" onClick={handleOffersClick}>
                      <Typography textAlign="center" >Offers</Typography>
                    </MenuItem>
                  )}
                  <MenuItem key="Contact" onClick={handleContactClick} href="#Contact">
                    <Typography textAlign="center" >Contact</Typography>
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
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <MenuItem key="Home" onClick={handleHomeClick}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key="Aboutus" onClick={handleAboutusClick}>
                  <Typography textAlign="center">About us</Typography>
                </MenuItem>
                {(isAdmin === "false" || !isAdmin) && (!isSuperAdmin) && (
                    <MenuItem key="Offers" onClick={handleOffersClick}>
                      <Typography textAlign="center">Offers</Typography>
                    </MenuItem>
                  )}
                 <MenuItem key="Contact" onClick={handleContactClick}>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Box>
              {/* <div className="search_container">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div> */}
              {!token && (
                
                  <h3 className="title_signin" onClick={handleLoginClick}>
                    Login
                  </h3>
                
              )}
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
                  </MenuItem>)} 
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
export default ResponsiveAppBar;
