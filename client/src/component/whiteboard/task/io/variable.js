import TextFieldWithTooltip from "../../../common/textFieldWithTooltip";
import * as React from "react";
import { useState } from "react";
import { Container, Chip, Grid, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChipContainer from "../../../common/chipContainer";

export default function VariableContainer({ onAddElement, children }) {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <AddIcon onClick={onAddElement} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
