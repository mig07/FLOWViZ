import { FormControl, Select, MenuItem } from "@material-ui/core";
import * as React from "react";

export default function ToolForm({
  collection = [],
  value = "",
  onSelectValueChange = () => {},
}) {
  const len = collection.length;

  const hasCollection = collection && len > 0;

  const Form = () => {
    return (
      <FormControl fullWidth>
        <Select
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
    );
  };

  return !hasCollection ? <></> : <Form />;
}
