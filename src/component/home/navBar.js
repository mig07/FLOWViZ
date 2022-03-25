import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const pageButtonsGroups = [
  {
    position: "center",
    pageButtons: [
      {
        name: "Home",
        url: "/", 
      },
      {
        name: "Documentation",
        url: "/documentation", 
      },
      {
        name: "About",
        url: "/about", 
      },
    ],
  },
  {
    position: "right",
    pageButtons: [
      {
        name: "Login",
        url: "/login", 
      },
      {
        name: "Register",
        url: "/register", 
      }
    ]
  }
]

const NavBar = props => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchor, setAnchor] = React.useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  
  const onPageMenuOpen = event => {
    setAnchor(event.currentTarget);
  };

  const onPageMenuItemClick = url => {
    navigate(url);
    setAnchor(null);
  };  

  return (
      <AppBar position="fixed" color="default">
        <Toolbar variant="regular"> 
          <Box sx={{ flexGrow: 1,
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: "left" }}>
            <Typography variant="h5">
              FLOWViZ
            </Typography>
          </Box>
          { isMobile ? ( // Mobile code
             {/* <>
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
           </> */ TODO}
          ) : ( // PC code
            pageButtonsGroups.map((pageButtonsGroup) => (
              <Box sx={{ flexGrow: 1,
                display: { xs: 'none', md: 'flex' }, 
                justifyContent: pageButtonsGroup.position }}>
                    { pageButtonsGroup.pageButtons.map((pageButton) => (
                      <Button
                        key={pageButton.name}
                        sx={{ my: 2, display: 'block' }}
                        onClick={() => navigate(pageButton.url) }>
                        {pageButton.name}
                      </Button>
                    ))}
                </Box> 
            ))
          )}
        </Toolbar>
      </AppBar>    
  );  
}

export default NavBar;