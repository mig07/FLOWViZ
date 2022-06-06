import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Copyright from "./component/common/copyright";
import NavBar from "./component/common/navBar";
import Config from "./config/dev-config.json";
import { Theme } from "./config/theme";
import useNavBar from "./hooks/useNavBar";
import About from "./page/about";
import Documentation from "./page/documentation";
import Home from "./page/home";
import Login from "./page/login";
import NotFound from "./page/notFound";
import PostTool from "./page/postTool";
import Register from "./page/register";
import ToolPage from "./page/toolPage";
import Whiteboard from "./page/whiteboard";
import WorkflowList from "./page/workflowList";
import Test from "./test/test";

export default function App() {
  const [drawerList, setDrawerList] = useNavBar();

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <NavBar drawerList={drawerList}>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route path={"/tool"} element={<PostTool />} />
            <Route
              exact
              path={"/documentation"}
              element={<Documentation config={Config.server} />}
            />
            <Route
              exact
              path={"/documentation/:toolName"}
              element={<ToolPage config={Config.server} />}
            />
            <Route path={"/about"} element={<About />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route exact path={"/workflow"} element={<WorkflowList />} />
            <Route
              path={"/whiteboard"}
              element={
                <Whiteboard
                  config={Config.server}
                  setDrawerList={setDrawerList}
                />
              }
            />
            <Route path={"/test"} element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </NavBar>
      </Router>
    </ThemeProvider>
  );
}
