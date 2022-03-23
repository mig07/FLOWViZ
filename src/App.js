import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./page/home"
import Documentation from "./page/documentation"
import About from "./page/about"

export default function App() {
  return (
    <>
      <Home/>
      <Router>
          <Routes>
            <Route exact path={"/"} component={<Home />} />
            <Route exact path={"/documentation"} component={<Documentation />} />
            <Route exact path={"/about"} component={<About />} />
          </Routes>            
      </Router>
    </>
  );  
}