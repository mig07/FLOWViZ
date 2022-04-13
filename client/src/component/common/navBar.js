import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, useMediaQuery } from '@material-ui/core';
import Theme from '../../config/theme'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

const pageButtonsGroups = [
  {
    position: "center",
    pageButtons: [
      {
        name: "Home",
        url: "/",
        isDefault: true
      },
      {
        name: "Documentation",
        url: "/documentation", 
        isDefault: false
      },
      {
        name: "About",
        url: "/about", 
        isDefault: false
      },
    ],
  },
  {
    position: "right",
    pageButtons: [
      {
        name: "Login",
        url: "/login",
        isDefault: false 
      },
      {
        name: "Register",
        url: "/register", 
        isDefault: false
      }
    ]
  }
]

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(Theme.breakpoints.down("xs"));

  const useStyles = makeStyles(() => ({
    appBar: { backgroundColor: 'white' }
  }));
  
  const classes = useStyles()

  const mobileInterface = {
    /* <>
    <IconButton onClick={onPageMenuOpen}>
      <MenuIcon />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchor={anchor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={open}
      onClose={() => setAnchor(null)}
    >
      { 
      pageButtonsGroups.map(pageButtonsGroup =>                 
       pageButtonsGroup.pageButtons.map(pageButton => {
         const { name, url } = pageButton;
         return (
           <MenuItem onClick={() => onPageMenuItemClick(url)}>
             {name}
           </MenuItem>
         );
       })
     )}
    </Menu>
  </> */
  }

  const pcInterface = 
    pageButtonsGroups.map((pageButtonsGroup) => (
      <Box sx={{ flexGrow: 1,
        display: { xs: 'none', md: 'flex' }, 
        justifyContent: pageButtonsGroup.position }}>
            { pageButtonsGroup.pageButtons.map((pageButton) => ( 
              <Button
                key={pageButton.name}
                sx={{ my: 2, display: 'block' }}                
                variant={location.pathname === pageButton.url ? 'outlined' : ''}
                onClick={() => navigate(pageButton.url) }>
                { pageButton.name }
            </Button>
            ))}
        </Box> 
    ))  

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="regular"> 
          <Box sx={{ flexGrow: 1,
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: "left" }}>              
              <Button
                key={"FLOWViZ"}
                sx={{ my: 2, display: 'block' }}
                onClick={() => navigate("/") }>
                <Typography variant="h5">FLOWViZ</Typography>
              </Button>
          </Box>
          { isMobile ? mobileInterface : pcInterface }
        </Toolbar>
      </AppBar>    
    </ThemeProvider>
  );  
}

export default NavBar;