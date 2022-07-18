import React from "react";
import { Avatar } from "@mui/material";

export default function UserAvatar({ username, width, height, fontSize }) {
  return (
    <Avatar
      alt={username}
      style={{ width: width, height: height }}
      {...strAvatar(username, fontSize)}
    />
  );
}

function strToColor(str) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function strAvatar(name, fontSize) {
  return {
    sx: {
      fontSize: fontSize,
      bgcolor: strToColor(name),
    },

    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
