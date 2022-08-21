import * as React from "react";
import { Grid } from "@mui/material";
import { FormControl, Select, MenuItem } from "@material-ui/core";

export default function ToolSetupSelectField(props) {
  const id = props.id;
  const label = props.label;
  const currValue = props.currValue;
  const values = props.values;
  const fieldWidth = Number(props.fieldWidth);
  const onCurrValueUpdate = props.onCurrValueUpdate;
  const stateDependency = props.stateDependency;

  const hasCollection = values && values.length > 0;

  return (hasCollection && !stateDependency) || stateDependency !== "" ? (
    <Grid item xs={fieldWidth}>
      <FormControl fullWidth>
        <Select
          id={id}
          label={label}
          value={currValue}
          onChange={onCurrValueUpdate}
        >
          {values.map((elem) => {
            return (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  ) : (
    <></>
  );
}
