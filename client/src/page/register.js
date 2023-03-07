import HowToRegIcon from "@mui/icons-material/HowToReg";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import UserForm from "../component/common/userForm";
import { RequestState } from "../hooks/useFetch";

export default function Register({ authService }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const [data, reqState, error, isRequesting, setIsRequesting] =
    authService.register(
      JSON.stringify({
        username: username,
        password: password,
      })
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRequesting(true);
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
      {reqState === RequestState.fetching ? <Loading /> : <></>}
      {reqState === RequestState.success ? onSuccess(data) : <></>}
      {reqState === RequestState.error ? onError(error) : <></>}
    </UserForm>
  );
}
