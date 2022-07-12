import { useEffect, useState } from "react";

export default function Tool({ config, toolName, children }) {
  const uri = `${config.appProtocol}://${config.address}:${config.port}/tool/${toolName}`;

  // Libraries and APIs state hook
  const [tool, setTool] = useState({
    name: "",
    description: "",
    api: [],
    library: [],
  });

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then(setTool);
  }, []);

  return children(tool);
}
