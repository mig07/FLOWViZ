import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Divider, Drawer, IconButton, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

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
  const onDragStart = (event, toolName) => {
    event.dataTransfer.setData("application/reactflow", toolName);
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
        {drawerList.map((item) => {
          const toolName = item.name;
          const type = item.type;
          const url = item.url;
          return (
            <ListItem key={toolName}>
              <ListItemButton sx={{ borderRadius: 4 }}>
                <ListItemText
                  onDragStart={(event) => onDragStart(event, toolName)}
                  draggable
                  primary={
                    <>
                      <Typography variant="button">{type}</Typography>
                      <Typography variant="h6">{toolName}</Typography>
                    </>
                  }
                  secondary={
                    <>
                      {type === "library" ? "Docker URL:" : "URL:"} {url}
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
