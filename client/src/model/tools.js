import { useEffect, useState } from "react";

export default function Tools({ config, children }) {
  const uri = `${config.appProtocol}://${config.address}:${config.port}/tool`;

  // Libraries and APIs state hook
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then(setList);
  }, []);

  return children(list);
}