import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Copyright from "./component/common/copyright";
import NavBar from "./component/navbar/navBar";
import Config from "./config/dev-config.json";
import { Theme } from "./config/theme";
import useNavBar from "./hooks/useNavBar";
import About from "./page/about";
import Documentation from "./page/documentation";
import Home from "./page/home";
import Login from "./page/login";
import ErrorPage from "./page/errorPage";
import PostTool from "./page/postTool";
import Profile from "./page/profile";
import Register from "./page/register";
import ToolPage from "./page/toolPage";
import Whiteboard from "./page/whiteboard";
import WorkflowList from "./page/workflowList";
import Workflow from "./page/workflow";
import Test from "./test/test";
import AuthService from "./service/authService";
import WorkflowService from "./service/workflowService";
import ToolService from "./service/toolService";

export default function App() {
  // Custom hook for pages with side drawer
  const [drawerList, setDrawerList] = useNavBar();

  const config = Config.server;
  const apiBaseUrl = `${config.appProtocol}://${config.address}:${config.port}/flowapi`;

  console.log(apiBaseUrl);

  // Services
  const authService = new AuthService(apiBaseUrl);
  const workflowService = new WorkflowService(apiBaseUrl);
  const toolService = new ToolService(apiBaseUrl);

  const ServiceContext = React.createContext({
    authService: authService,
    workflowService: workflowService,
    toolService: toolService,
  });

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
              element={<Documentation config={apiBaseUrl} />}
            />
            <Route
              exact
              path={"/documentation/:toolName"}
              element={<ToolPage config={apiBaseUrl} />}
            />
            <Route path={"/tool"} element={<PostTool />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route
              path={"/profile"}
              element={<Profile config={apiBaseUrl} />}
            />
            <Route
              exact
              path={"/workflow"}
              element={<WorkflowList config={apiBaseUrl} />}
            />
            <Route
              exact
              path={"/workflow/:name"}
              element={<Workflow config={apiBaseUrl} />}
            />
            <Route
              path={"/whiteboard"}
              element={
                <Whiteboard config={apiBaseUrl} setDrawerList={setDrawerList} />
              }
            />
            <Route path={"/test"} element={<Test />} />
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
