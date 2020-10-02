import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import { Button, TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async e => {
    try {
      e.preventDefault();
      const loginUser = {
        email,
        password
      };
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <LockIcon fontSize="large" color="secondary" />
      <H3>Log in</H3>

      <TextField
        label="Email"
        id="login-email"
        type="email"
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        onChange={e => setPassword(e.target.value)}
        id="login-password"
        type="text"
      />

      <Button
        id="submit"
        type="submit"
        value="login"
        color="primary"
        variant="outlined"
      >
        Log in
      </Button>
      <ErrorNotice
        message={error}
        clearError={() => {
          setError(undefined);
        }}
      />
    </Form>
  );
}
