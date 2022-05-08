import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const pageButtonsGroups = [
  {
    position: "center",
    pageButtons: [
      {
        name: "Home",
        url: "/",
        isDefault: true,
      },
      {
        name: "Documentation",
        url: "/documentation",
        isDefault: false,
      },
      {
        name: "About",
        url: "/about",
        isDefault: false,
      },
    ],
  },
  {
    position: "right",
    pageButtons: [
      {
        name: "Login",
        url: "/login",
        isDefault: false,
      },
      {
        name: "Register",
        url: "/register",
        isDefault: false,
      },
    ],
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const useStyles = makeStyles(() => ({
    appBar: {
      backgroundColor: "white",
    },
  }));

  const classes = useStyles();

  const pcInterface = pageButtonsGroups.map((pageButtonsGroup) => (
    <Box
      key={pageButtonsGroup.position}
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: pageButtonsGroup.position,
      }}
    >
      {pageButtonsGroup.pageButtons.map((pageButton) => (
        <Button
          key={pageButton.name}
          sx={{ my: 2, display: "block" }}
          variant={location.pathname === pageButton.url ? "outlined" : "text"}
          onClick={() => navigate(pageButton.url)}
        >
          {pageButton.name}
        </Button>
      ))}
    </Box>
  ));

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar variant="regular">
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "left",
            }}
          >
            <Button
              key={"FLOWViZ"}
              sx={{ my: 2, display: "block" }}
              onClick={() => navigate("/")}
            >
              <Typography variant="h5">FLOWViZ</Typography>
            </Button>
          </Box>
          {pcInterface}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
