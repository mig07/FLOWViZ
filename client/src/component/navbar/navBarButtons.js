import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import * as React from "react";

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
          onClick={() => navigateTo(pageButton.url)}
        >
          {pageButton.name}
        </Button>
      ))}
    </Box>
  ));
}
