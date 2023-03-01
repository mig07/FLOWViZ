import * as React from "react";
import { Grid } from "@mui/material";
import { FormControl, Select, MenuItem } from "@material-ui/core";

export default function ToolSetupSelectField({
  id,
  label,
  currValue,
  values,
  fieldWidth,
  onCurrValueUpdate,
  stateDependency,
}) {
  const hasCollection = values && values.length > 0;

  return hasCollection ? (
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
