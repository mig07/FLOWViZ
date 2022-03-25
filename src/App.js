import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./page/home"
import Documentation from "./page/documentation"
import About from "./page/about"
import Login from "./page/login"
import Register from "./page/register"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
    <>
      <Router>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/documentation"} element={<Documentation />} />
            <Route exact path={"/about"} element={<About />} />
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
          </Routes>            
      </Router>
    </>
  );  
}