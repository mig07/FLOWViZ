import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const pages = ['Home', 'Documentation', 'About'];

export default function NavBar() {
  return (
      <AppBar position="static" color="default">
        <Toolbar variant="regular">
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>  
        </Toolbar>
      </AppBar>    
  );
}