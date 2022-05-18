import * as React from "react";
import { Grid } from "@mui/material";
import ToolForm from "./toolForm";

export default function ToolSetupSelectField(props) {
  const id = props.id;
  const label = props.label;
  const currValue = props.currValue;
  const values = props.values;
  const onCurrValueUpdate = props.onCurrValueUpdate;
  const stateDependency = props.stateDependency;

  // If it is single, uses the full width, else leaves half of the space for the other field
  const gridItemFullWidth = 12;
  const gridItemHalfWidth = gridItemFullWidth / 2;
  const fieldWidth =
    stateDependency === currValue ? gridItemFullWidth : gridItemHalfWidth;

  return (
    <Grid item sx={fieldWidth}>
      <ToolForm
        id={id}
        label={label}
        collection={values}
        value={currValue}
        onValueUpdate={onCurrValueUpdate}
      />
    </Grid>
  );

  /* return stateDependency && stateDependency !== "" ? (
    <>
      <Grid item sx={fieldWidth}>
        <ToolForm
          id={id}
          label={label}
          collection={values}
          value={currValue}
          onValueUpdate={onCurrValueUpdate}
        />
      </Grid>
    </>
  ) : (
    <></>
  ); */
}
