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
          <Avatar
            alt={user.user.username}
            style={{ width: 256, height: 256 }}
            {...strAvatar(user.user.username)}
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

function strToColor(str) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function strAvatar(name) {
  return {
    sx: {
      fontSize: 120,
      bgcolor: strToColor(name),
    },

    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
