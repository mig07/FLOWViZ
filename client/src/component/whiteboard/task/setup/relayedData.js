import { Container, Typography } from "@mui/material";
import React from "react";
import ChipContainer from "../../../common/chipContainer";

export default function RelayedData({ relayedOutputs }) {
  return relayedOutputs.map((item) => {
    return (
      <>
        <Typography>{item.name}</Typography>
        <ChipContainer chips={[item.key]} />
      </>
    );
  });
}
