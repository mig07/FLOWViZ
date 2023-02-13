import * as React from "react";
import Library from "./library";
import Api from "./api";

export default function ToolFunctions({ tool }) {
  const type = tool.access._type;
  const library = tool.library;
  const api = tool.api;

  return type === "api" ? (
    <Api endpoints={api} />
  ) : (
    <Library name={tool.general.name} library={library} />
  );
}
