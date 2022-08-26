import React from "react";
import { useContext } from "react";
import { Box, Container, Stack, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Loading from "../component/common/loading";
import GenericError from "../component/common/genericError";
import ToolCardGrid from "../component/documentation/toolCardGrid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import CenteredContainer from "../component/common/centeredContainer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function Documentation({ toolService }) {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar />
      <Stack>
        <Typography variant="h3" align="center">
          Available tools
        </Typography>
        {toolService.getTools(GenericError, ToolCardGrid, <Loading />)}
        <Container sx={{ mt: 6 }}>
          <CenteredContainer>
            <Fab variant="extended" onClick={() => navigate("/tool")}>
              <AddIcon sx={{ mr: 1 }} />
              Add tool
            </Fab>
          </CenteredContainer>
        </Container>
      </Stack>
    </>
  );
}
