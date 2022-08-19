import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HelpIcon from "@mui/icons-material/Help";

const pageButtonsGroups = [
  {
    position: "center",
    pageButtons: [
      {
        name: "Home",
        url: "/",
        icon: <HomeIcon />,
      },
      {
        name: "Documentation",
        url: "/documentation",
        icon: <LibraryBooksIcon />,
      },
      {
        name: "About",
        url: "/about",
        icon: <HelpIcon />,
      },
    ],
  },
];

export default function NavBarButtons({ navigateTo, currentPage }) {
  return pageButtonsGroups.map((pageButtonsGroup) => (
    <Box
      key={pageButtonsGroup.position}
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: pageButtonsGroup.position,
      }}
    >
      {pageButtonsGroup.pageButtons.map((pageButton) => (
        <Button
          key={pageButton.name}
          color="secondary"
          variant={currentPage === pageButton.url ? "outlined" : "string"}
          startIcon={pageButton.icon}
          onClick={() => navigateTo(pageButton.url)}
        >
          {pageButton.name}
        </Button>
      ))}
    </Box>
  ));
}
