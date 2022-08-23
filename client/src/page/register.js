import HowToRegIcon from "@mui/icons-material/HowToReg";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import React from "react";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import UserForm from "../component/common/userForm";
import AuthService from "../service/authService";
import config from "../config/dev-config.json";

export default function Register({ authService }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onFieldChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const onError = (error) => {
    return <InfoBar type="error" text={error} />;
  };

  const onSuccess = () => (
    <InfoBar type="success" text="Successfully registered!" />
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
  };

  const OnRegister = () => {
    return authService.register(
      JSON.stringify({
        /* email: email, */
        username: username,
        password: password,
      }),
      onError,
      onSuccess,
      <Loading />
    );
  };

  return (
    <UserForm
      name="Sign up"
      icon={<HowToRegIcon />}
      handleSubmit={handleSubmit}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(event) => onFieldChange(event, setEmail)}
      />
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
      {submitting ? <OnRegister /> : <></>}
    </UserForm>
  );
}
