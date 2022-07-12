import * as React from "react";
import Library from "./library";
import Api from "./api";

export default function ToolFunctions({ tool }) {
  console.log(tool);

  const library = tool.library;
  const api = tool.api;

  return (
    <>
      <Api api={api} />
      <Library library={library} />
    </>
  );
}
