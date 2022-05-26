import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, IconButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarButtons from "./navBarButtons";
import NavBarTitle from "./navBarTitle";

const drawerWidth = 250;

const pagesWithDrawer = ["/whiteboard"];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
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

export default function NavBar({ children, drawerData }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const hasDrawer = pagesWithDrawer.includes(currentPage);

  const [open, setOpen] = React.useState(false);

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
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
  };

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed" open={open}>
        <Toolbar>
          {hasDrawer ? drawerIcon : <></>}
          <NavBarTitle navigateTo={navigateTo} />
          <NavBarButtons />
        </Toolbar>
      </AppBar>
      <Toolbar />
      {hasDrawer ? <PersistantDrawer list={drawerData} /> : <></>}
      {hasDrawer ? <Main open={open}>{children}</Main> : children}
    </>
  );
}
