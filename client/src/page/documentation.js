import AddIcon from "@mui/icons-material/Add";
import { Container, Stack, Toolbar } from "@mui/material";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import CenteredContainer from "../component/common/centeredContainer";
import GenericError from "../component/common/genericError";
import Loading from "../component/common/loading";
import ToolCardGrid from "../component/documentation/toolCardGrid";

export default function Documentation({ toolService }) {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar />
      <Container>
        <Stack alignItems="center" spacing={3}>
          <Typography variant="h3" align="center">
            Available tools
          </Typography>
          {toolService.getTools(GenericError, ToolCardGrid, <Loading />)}
          <CenteredContainer>
            <Fab variant="extended" onClick={() => navigate("/tool")}>
              <AddIcon sx={{ mr: 1 }} />
              Add tool
            </Fab>
          </CenteredContainer>
        </Stack>
      </Container>
    </>
  );
}
