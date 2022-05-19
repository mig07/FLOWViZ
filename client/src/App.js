import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./page/home";
import Documentation from "./page/documentation";
import About from "./page/about";
import Login from "./page/login";
import Register from "./page/register";
import NotFound from "./page/notFound";
import WorkflowList from "./page/workflowList";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./config/theme";
import NavBar from "./component/common/navBar";
import Copyright from "./component/common/copyright";
import Config from "./config/dev-config.json";
import Library from "./page/library";
import Whiteboard from "./page/whiteboard";
import PostTool from "./page/postTool";
import Test from "./test/test";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/tool"} element={<PostTool />} />
          <Route
            exact
            path={"/documentation"}
            element={<Documentation config={Config.server} />}
          />
          <Route
            exact
            path={"/documentation/:libraryName"}
            element={<Library config={Config.server} />}
          />
          <Route exact path={"/about"} element={<About />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/workflow"} element={<WorkflowList />} />
          <Route
            exact
            path={"/whiteboard"}
            element={<Whiteboard config={Config.server} />}
          />
          <Route exact path={"/test"} element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Router>
    </ThemeProvider>
  );
}
