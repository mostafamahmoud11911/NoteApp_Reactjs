import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authActions";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  function handleLogout() {
    handleCloseNavMenu();
    dispatch(logout());
    navigate("/signin");
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NoteAltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to=""
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Note
          </Typography>
          <NoteAltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Note
          </Typography>

          <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
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
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "#333" }}
                  >
                    Signout
                  </Typography>
                </MenuItem>
              ) : (
                <Box>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      sx={{ textDecoration: "none", color: "#333" }}
                      component={Link}
                      to={"/signup"}
                    >
                      Signup
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      sx={{ textDecoration: "none", color: "#333" }}
                      component={Link}
                      to={"/signin"}
                    >
                      Signin
                    </Typography>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex", alignItems: "center" },
            }}
          >
            {isAuthenticated ? (
              <Typography
                onClick={handleLogout}
                sx={{
                  m: 2,
                  color: "white",
                  display: "block",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Sign out
              </Typography>
            ) : (
              <>
                <Typography
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/signup"
                  sx={{
                    m: 2,
                    color: "white",
                    display: "block",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Signup
                </Typography>
                <Typography
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/signin"
                  sx={{
                    m: 2,
                    color: "white",
                    display: "block",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Signin
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
