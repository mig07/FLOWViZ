import HowToRegIcon from "@mui/icons-material/HowToReg";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import React from "react";
import UserForm from "../component/common/userForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFieldChange = (event, setter) => {
    const value = event.target.value;
    setter(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("name"),
      password: data.get("password"),
    });
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
        //autoFocus
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
    </UserForm>
  );
}
