import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { List, ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;


export default function ToolDrawer(props) {
    const onDragStart = (event) => {
        event.dataTransfer.setData('application/reactflow', 'default');
        event.dataTransfer.effectAllowed = 'move';
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
            {props.tools.map(tool => {
                const name = tool.name
                return (
                    <ListItem button key={name}>
                        <ListItemText onDragStart={(event) => onDragStart(event)} draggable>
                            {name}
                        </ListItemText>              
                    </ListItem>
                )
            })}
        </List>
      </Drawer>      
    </Box>
  );
}
