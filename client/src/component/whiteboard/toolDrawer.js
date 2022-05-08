import * as React from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { List, ListItem, Toolbar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function ToolDrawer(props) {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      event.target.textContent
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <DrawerHeader />
        <List>
          {props.tools.map((tool) => {
            const name = tool.name;
            return (
              <ListItem button key={name}>
                <ListItemText
                  onDragStart={(event) => onDragStart(event)}
                  draggable
                >
                  {name}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
