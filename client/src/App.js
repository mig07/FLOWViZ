import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./page/home"
import Documentation from "./page/documentation"
import About from "./page/about"
import Login from "./page/login"
import Register from "./page/register"
import WorkflowList from "./page/workflowList"
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./component/common/navBar";
import Copyright from "./component/common/copyright";
import Config from "./config/dev-config.json";

const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
    <>
      <Router>
        <NavBar/>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/documentation"} element={<Documentation config={Config.server} />} />
            <Route exact path={"/about"} element={<About />} />
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/workflow"} element={<WorkflowList />} />
          </Routes>            
          <Copyright sx={{ mt: 8, mb: 4 }} />        
      </Router>
    </>
  );  
}