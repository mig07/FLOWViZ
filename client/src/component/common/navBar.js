import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Documentation",
    url: "/documentation",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Login",
    url: "/login",
  },
  {
    name: "Register",
    url: "/register",
  },
];

export default function NavBar() {
  const navigate = useNavigate();

  const [page, setPage] = React.useState("Home");

  const useStyles = makeStyles(() => ({
    appBar: {
      backgroundColor: "white",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense">
          <Button onClick={() => navigate("/")}>
            <Typography style={{ color: "black" }} variant="h5">
              FLOWViZ
            </Typography>
          </Button>
          <Container>
            <Tabs
              centered
              value={tabs.find(tab => (location.pathname === tab.url)).name}
              onChange={(event, newPage) => setPage(newPage)}
              textColor="secondary"
              variant="fullWidth"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {tabs.map((tab) => (
                <Tab
                  key={`${tab.name}-key`}
                  value={tab.name}
                  label={tab.name}
                  onClick={() => navigate(tab.url)}
                ></Tab>
              ))}
            </Tabs>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
