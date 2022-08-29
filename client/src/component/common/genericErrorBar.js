import * as React from "react";
import InfoBar from "./infoBar";

export default function GenericErrorBar({ error }) {
  return <InfoBar type="error" text={error} />;
}
