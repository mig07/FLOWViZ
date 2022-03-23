import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./page/home"
import Documentation from "./page/documentation"
import About from "./page/about"

export default function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/documentation"} element={<Documentation />} />
            <Route exact path={"/about"} element={<About />} />
          </Routes>            
      </Router>
    </>
  );  
}