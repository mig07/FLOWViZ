import { useEffect, useState } from "react";

export default function useTool(config, toolName) {
  console.log(toolName);

  const uri = `${config.appProtocol}://${config.address}:${config.port}/tool/${toolName}`;

  // Libraries and APIs state hook
  const [tool, setTool] = useState({
    name: "",
    description: "",
    library: {
      name: "",
      commandGroups: [],
    },
    api: [],
  });

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then(setTool);
  }, []);

  return [tool];
}
