import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import {
  Button,
  TextField,
  Grid,
  Paper,
  makeStyles,
  Typography
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: "20px auto",
    padding: theme.spacing(5),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const classes = useStyles();

  const submitForm = async e => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        name
      };
      await axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password
        }
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
    <form onSubmit={submitForm}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <LockIcon fontSize="large" color="secondary" />
        <Paper className={classes.paper}>
          <Typography variant="h6">Sign Up</Typography>
          <ErrorNotice
            message={error}
            clearError={() => {
              setError(undefined);
            }}
          />
          <Grid item>
            <TextField
              label="Email"
              type="email"
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Password*"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Verify Password*"
              onChange={e => setPasswordCheck(e.target.value)}
              placeholder="verify password*"
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              type="text"
              onChange={e => setName(e.target.value)}
            />
          </Grid>
        </Paper>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          value="register"
        >
          Register
        </Button>
      </Grid>
    </form>
  );
}
