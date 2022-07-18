import React from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import PageTitle from "../component/common/pageTitle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import UserAvatar from "../component/common/userAvatar";

const profile = {
  username: "Miguel Luís",
  email: "miguelfluis7@gmail.com",
};

export default function Profile({ config }) {
  const url = `${config.appProtocol}://${config.address}:${config.port}/profile`;

  const onError = (error) => {};

  const OnSuccess = (user) => {
    return (
      <Grid container maxWidth="lg" spacing={5} sx={{ mt: 2 }}>
        <Grid item>
          <UserAvatar
            username={user.user.username}
            width={256}
            height={256}
            fontSize={120}
          />
        </Grid>
        <Grid item>
          <Stack direction="column" spacing={2}>
            <Typography variant="h6">Name: {user.user.username}</Typography>
            <Typography variant="h6">Email: {user.user.email}</Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<SyncLockIcon />}
              >
                Change password
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<PersonRemoveIcon />}
              >
                Delete account
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Toolbar />
      <PageTitle name="Profile" />
      <OnSuccess user={profile} />
    </Container>
  );
}
