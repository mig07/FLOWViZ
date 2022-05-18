import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";

export default function ToolForm(props) {
  const selectId = props.id;
  const selectLabel = props.label;
  const collection = props.collection;
  const value = props.value;
  const onSelectValueChange = props.onValueUpdate;
  const len = collection.length

  const hasCollection = collection && len > 0

  const Form = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id={selectId}>{selectLabel}</InputLabel>
        <Select
          id={selectId}
          label={selectLabel}
          value={value}
          onChange={onSelectValueChange}
        >
          {collection.map((elem) => {
            return (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>      
    )
  }

  return !hasCollection ? (<></>) : (<Form/>)

}