import React from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import UserAvatar from "./userAvatar";

const notAuthenticatedButtons = [
  {
    name: "Login",
    url: "/login",
  },
  {
    name: "Register",
    url: "/register",
  },
];

const authenticatedButtons = [
  {
    name: "Workflows",
    url: "/workflow",
  },
];

const authSection = (navigateTo, currentPage, username) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const navigateAndClose = (event, url) => {
    navigateTo(url);
    handleClose(event);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      {authenticatedButtons.map((pageButton) => (
        <Button
          key={pageButton.name}
          color="secondary"
          variant={currentPage === pageButton.url ? "outlined" : "string"}
          onClick={() => navigateTo(pageButton.url)}
        >
          {pageButton.name}
        </Button>
      ))}
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <UserAvatar username={username} width={32} height={32} fontSize={16} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(event) => navigateAndClose(event, "/profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => {
                      localStorage.setItem("auth", "{}");
                      handleClose(event);
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const notAuthSection = (navigateTo, currentPage) => {
  return notAuthenticatedButtons.map((pageButton) => {
    return (
      <Button
        key={pageButton.name}
        color="secondary"
        variant={currentPage === pageButton.url ? "outlined" : "string"}
        onClick={() => navigateTo(pageButton.url)}
      >
        {pageButton.name}
      </Button>
    );
  });
};

export default function NavBarAuthButtons({
  navigateTo,
  currentPage,
  username,
}) {
  return (
    <Box
      key={"right"}
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "right",
      }}
    >
      {!username
        ? notAuthSection(navigateTo, currentPage)
        : authSection(navigateTo, currentPage, username)}
    </Box>
  );
}
