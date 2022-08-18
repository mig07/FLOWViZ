import * as React from "react";
import { Grid } from "@mui/material";
import ToolForm from "./toolForm";

export default function ToolSetupSelectField(props) {
  const id = props.id;
  const label = props.label;
  const currValue = props.currValue;
  const values = props.values;
  const fieldWidth = Number(props.fieldWidth);
  const onCurrValueUpdate = props.onCurrValueUpdate;
  const stateDependency = props.stateDependency;

  return !stateDependency || (stateDependency && stateDependency !== "") ? (
    <Grid item xs={fieldWidth}>
      <ToolForm
        id={id}
        label={label}
        collection={values}
        value={currValue}
        onSelectValueChange={onCurrValueUpdate}
      />
    </Grid>
  ) : (
    <></>
  );
}
