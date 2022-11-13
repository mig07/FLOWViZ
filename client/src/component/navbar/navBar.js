import styled from "@emotion/styled";
import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarAuthButtons from "./navBarAuthButtons";
import NavBarButtons from "./navBarButtons";
import NavBarDrawer from "./navBarDrawer";
import NavBarTitle from "./navBarTitle";
import NavMenuButtons from "./navMenuButtons";

const drawerWidth = 250;
const drawerPages = ["/whiteboard"];

export default function NavBar({ drawerList, auth, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const isDrawerPage = drawerPages.includes(currentPage);

  const hasDrawer = isDrawerPage && drawerList && drawerList.length > 0;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: matches
        ? `calc(100% - ${drawerWidth}px)`
        : `calc(100% + ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerIcon = (
    <IconButton
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
    >
      <MenuIcon />
    </IconButton>
  );

  const useStyles = makeStyles(() => ({
    appBar: {
      backgroundColor: "white",
    },
  }));

  const classes = useStyles();

  const navigateTo = (page) => {
    // Avoid current page rerender
    if (page === currentPage) return;
    navigate(page);
    setDrawerOpen(false); // Close drawer nav bar gap when changing page
  };

  const username = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).username
    : null;

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed" open={drawerOpen}>
        <Toolbar>
          {hasDrawer ? drawerIcon : <></>}
          <NavBarTitle navigateTo={navigateTo} />
          {matches ? (
            <>
              <NavBarButtons
                navigateTo={navigateTo}
                currentPage={currentPage}
              />
              <NavBarAuthButtons
                navigateTo={navigateTo}
                currentPage={currentPage}
                username={username}
              />
            </>
          ) : (
            <NavMenuButtons />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {hasDrawer ? (
        <NavBarDrawer
          drawerList={drawerList}
          drawerWidth={drawerWidth}
          open={drawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      ) : (
        <></>
      )}
      {children}
    </>
  );
}
