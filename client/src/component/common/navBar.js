import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, IconButton, ListItemButton } from "@mui/material";
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

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerIcon = (
    <IconButton
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{ mr: 2, ...(open && { display: "none" }) }}
    >
      <MenuIcon />
    </IconButton>
  );

  const PersistantDrawer = (list) => {
    const onDragStart = (event) => {
      event.dataTransfer.setData(
        "application/reactflow",
        event.target.textContent
      );
      event.dataTransfer.effectAllowed = "move";
    };

    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          <LibraryBooksIcon />
          <Typography variant="h6" align="left">
            Available tools
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {list.list.map((item) => (
            <ListItem key={item.name}>
              <ListItemButton sx={{ borderRadius: 4 }}>
                <ListItemText
                  onDragStart={(event) => onDragStart(event)}
                  draggable
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };

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
    setOpen(false); // Close drawer nav bar gap when changing page
  };

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed" open={open}>
        <Toolbar>
          {hasDrawer ? drawerIcon : <></>}
          <NavBarTitle navigateTo={navigateTo} />
          <NavBarButtons navigateTo={navigateTo} currentPage={currentPage} />
          <NavBarAuthButtons
            navigateTo={navigateTo}
            currentPage={currentPage}
            //auth={{ username: "Miguel Luís" }}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      {hasDrawer ? <PersistantDrawer list={drawerList} /> : <></>}
      {children}
    </>
  );
}
