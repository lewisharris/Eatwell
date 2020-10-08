import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import { Button, TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async e => {
    e.preventDefault();
    try {
      // create new user
      const newUser = {
        email,
        password,
        passwordCheck,
        username
      };
      await axios.post("http://localhost:5000/users/register", newUser);

      //log new user in
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password
        }
      );
      await setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });

      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <LockIcon fontSize="large" color="secondary" />
      <H3>Sign Up</H3>

      <TextField
        label="Email"
        type="email"
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        label="Password*"
        onChange={e => setPassword(e.target.value)}
        type="password"
      />

      <TextField
        label="Verify Password*"
        onChange={e => setPasswordCheck(e.target.value)}
        placeholder="verify password*"
        type="password"
      />
      <TextField
        label="Username"
        type="text"
        onChange={e => setUsername(e.target.value)}
      />
      <Button type="submit" color="primary" variant="outlined" value="register">
        Register
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
