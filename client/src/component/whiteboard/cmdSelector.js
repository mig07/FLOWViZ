import * as React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./toolNode.css";

export default function CmdSelector({ id = 0, collection = [], selectedElem = "", cb = () => { }, label = "" }) {
  const labelId = `${id}-label`;

  return collection && collection.length > 0 ? (
    <>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        fullWidth
        labelId={labelId}
        id={id}
        value={selectedElem}
        onChange={cb}
        label={label}
      >
        {collection.map((elem) => {
          return (
            <MenuItem key={elem} value={elem}>
              {elem}
            </MenuItem>
          );
        })}
      </Select>
    </>
  ) : (
    <></>
  );
}
