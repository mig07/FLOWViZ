import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const pageButtonsGroups = [
  {
    position: "center",
    pageButtons: [
      {
        name: "Home",
        url: "/",
        isDefault: true,
      },
      {
        name: "Documentation",
        url: "/documentation",
        isDefault: false,
      },
      {
        name: "About",
        url: "/about",
        isDefault: false,
      },
    ],
  },
  {
    position: "right",
    pageButtons: [
      {
        name: "Login",
        url: "/login",
        isDefault: false,
      },
      {
        name: "Register",
        url: "/register",
        isDefault: false,
      },
    ],
  },
];

export default function NavBarButtons({ navigateTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

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
