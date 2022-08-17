import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, IconButton, ListItemButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useState } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex",
}));

export default function NavBarDrawer({
  drawerList,
  drawerWidth,
  open,
  handleDrawerClose,
}) {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      event.target.textContent
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <LibraryBooksIcon />
        <Typography variant="h6" align="left">
          Available tools
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerList.map((item) => (
          <ListItem key={item.name}>
            <ListItemButton sx={{ borderRadius: 4 }}>
              <ListItemText
                onDragStart={(event) => onDragStart(event)}
                draggable
                primary={item.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
