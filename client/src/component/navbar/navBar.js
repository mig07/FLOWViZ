import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarAuthButtons from "./navBarAuthButtons";
import NavBarButtons from "./navBarButtons";
import NavBarTitle from "./navBarTitle";
import NavBarDrawer from "./navBarDrawer";
import NavMenuButtons from "./navMenuButtons";

const drawerWidth = 250;
const drawerPages = ["/whiteboard"];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function NavBar({ drawerList, auth, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const isDrawerPage = drawerPages.includes(currentPage);

  const hasDrawer = isDrawerPage && drawerList && drawerList.length > 0;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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
