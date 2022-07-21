import * as React from "react";
import Workflow from "../page/workflow";
import Profile from "../page/profile";
import config from "../config/dev-config.json";

export default function Test() {
  return <Profile config={config} />;
}
