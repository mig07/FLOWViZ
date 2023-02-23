import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./component/navbar/navBar";
import { Theme } from "./config/theme";
import useNavBar from "./hooks/useNavBar";
import About from "./page/about";
import Documentation from "./page/documentation";
import ErrorPage from "./page/errorPage";
import Home from "./page/home";
import Login from "./page/login";
import PostTool from "./page/postTool";
import Profile from "./page/profile";
import Register from "./page/register";
import Submission from "./page/submission";
import ToolPage from "./page/toolPage";
import Whiteboard from "./page/whiteboard";
import Workflow from "./page/workflow";
import WorkflowList from "./page/workflowList";
import AuthService from "./service/authService";
import ToolService from "./service/toolService";
import WorkflowService from "./service/workflowService";
import PrivateRoute from "./util/privateRoute";

export default function App() {
  // Custom hook for pages with side drawer
  const [drawerList, setDrawerList] = useNavBar();

  // eslint-disable-next-line no-undef
  const config = process.env;

  const apiBaseUrl = `${config.REACT_APP_SERVER_PROTOCOL}://${config.REACT_APP_SERVER_ADDRESS}:${config.REACT_APP_SERVER_PORT}/flowapi`;

  // Services
  const authService = new AuthService(apiBaseUrl);
  const workflowService = new WorkflowService(apiBaseUrl);
  const toolService = new ToolService(apiBaseUrl);

  return (
    <ThemeProvider theme={Theme}>
      <Router basename="/flowviz">
        <NavBar drawerList={drawerList}>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route
              exact
              path={"/documentation"}
              element={<Documentation toolService={toolService} />}
            />
            <Route
              exact
              path={"/documentation/:toolName"}
              element={<ToolPage toolService={toolService} />}
            />
            <Route
              path={"/tool"}
              element={<PostTool toolService={toolService} />}
            />
            <Route
              path={"/login"}
              element={<Login authService={authService} />}
            />
            <Route
              path={"/register"}
              element={<Register authService={authService} />}
            />
            <Route element={<PrivateRoute />}>
              <Route
                path="/profile"
                element={<Profile authService={authService} />}
              />
              <Route
                path="/workflow"
                element={<WorkflowList workflowService={workflowService} />}
              />
              <Route
                path="/workflow/:name"
                element={<Workflow workflowService={workflowService} />}
              />
              <Route
                path={"/whiteboard"}
                element={
                  <Whiteboard
                    toolService={toolService}
                    workflowService={workflowService}
                    setDrawerList={setDrawerList}
                  />
                }
              />
            </Route>
            <Route path="/submission" element={<Submission />} />
            <Route
              path="*"
              element={
                <ErrorPage statusCode={404} errorText="Page not found!" />
              }
            />
          </Routes>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </NavBar>
      </Router>
    </ThemeProvider>
  );
}
