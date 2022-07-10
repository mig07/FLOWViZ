import LoginIcon from "@mui/icons-material/Login";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import React from "react";
import { useState } from "react";
import UserForm from "../component/common/userForm";
import Checkbox from "@mui/material/Checkbox";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import Request from "../service/request";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTrusted, setIsTrusted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onFieldChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const onError = (error) => <InfoBar type="error" text={error} />;

  const onSuccess = (data) => (
    <InfoBar type="success" text="Login successful" />
  );

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
  };

  const OnLogin = () => {
    return Request(
      "http://localhost:3000/login",
      options,
      onError,
      onSuccess,
      <Loading />
    );
  };

  return (
    <>
      <UserForm name="Sign in" icon={<LoginIcon />} handleSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => onFieldChange(event, setUsername)}
          //autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => onFieldChange(event, setPassword)}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={isTrusted}
              color="primary"
              onChange={(event) => onFieldChange(event, setIsTrusted)}
            />
          }
          label="Remember me"
        />
      </UserForm>
      {submitting ? <OnLogin /> : <></>}
    </>
  );
}
