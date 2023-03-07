import LoginIcon from "@mui/icons-material/Login";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import UserForm from "../component/common/userForm";
import { RequestState } from "../hooks/useFetch";

export default function Login({ authService }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTrusted, setIsTrusted] = useState(false);

  const navigate = useNavigate();

  const onFieldChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const onError = (error) => {
    return <InfoBar type="error" text={error} />;
  };

  const onSuccess = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    navigate("/");
    return <InfoBar type="success" text="Successfully logged in!" />;
  };

  const [data, reqState, error, isRequesting, setIsRequesting] =
    authService.login(
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
        {reqState === RequestState.fetching ? <Loading /> : <></>}
        {reqState === RequestState.success ? onSuccess(data) : <></>}
        {reqState === RequestState.error ? onError(error) : <></>}
      </UserForm>
    </>
  );
}
