import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Button, Toolbar } from "@material-ui/core/";

export default function AuthButtons() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding: 0
    },
    title: {
      flexGrow: 1
    },
    AppBar: { padding: 0 }
  }));

  const register = e => {
    e.preventDefault();
    history.push("/register");
  };
  const login = e => {
    e.preventDefault();
    history.push("/login");
  };
  const classes = useStyles();

  return (
    <>
      {userData.user ? null : (
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              label="EatWell"
            />
            <Button color="inherit" onClick={register}>
              Register
            </Button>
            <Button color="inherit" onClick={login}>
              Log In
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
