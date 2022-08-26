import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Toolbar,
} from "@mui/material";

export default function Selector({
  id,
  label,
  collection,
  prop,
  value,
  onChange,
  dependency,
  isFirst = false,
}) {
  return isFirst || dependency ? (
    <Box width="100%" sx={{ maxWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id={`${id}-selector`}>{label}</InputLabel>
        <Select
          labelId={`${id}-selector`}
          id={`${id}-selector`}
          value={value}
          onChange={onChange}
        >
          {collection && collection.length > 0 ? (
            collection.map((elem, index) =>
              prop ? (
                <MenuItem key={`${id}-${index}`} value={elem[prop]}>
                  {elem[prop]}
                </MenuItem>
              ) : (
                <MenuItem key={`${id}-${index}`} value={elem}>
                  {elem}
                </MenuItem>
              )
            )
          ) : (
            <MenuItem></MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  ) : (
    <></>
  );
}
