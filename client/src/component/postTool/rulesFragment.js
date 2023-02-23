import { Toolbar } from "@mui/material";
import * as React from "react";
import { LibraryRulesContext } from "../../context/libraryRulesProvider";
import CommandGroups from "./commandGroups";

import Endpoints from "./endpoints";

function Rules({
  api,
  configMethod,
  onApiUpdate = () => {},
  generateEndpoint,
}) {
  const LibraryConfig = () => (
    <LibraryRulesContext.Consumer>
      {(props) => <CommandGroups props={props} />}
    </LibraryRulesContext.Consumer>
  );

  const ApiConfig = () => (
    <Endpoints
      api={api}
      onApiUpdate={onApiUpdate}
      generateEndpoint={generateEndpoint}
    />
  );

  const Method = () => {
    switch (configMethod) {
      case "library":
        return <LibraryConfig />;
      case "api":
        return <ApiConfig />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {/* <Method /> */}
      <LibraryConfig />
      <Toolbar />
    </>
  );
}

export default React.memo(Rules);
