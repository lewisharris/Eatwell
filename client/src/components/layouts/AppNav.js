import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/userContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0,
    background: "#151515"
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

export default function AppNav() {
  const history = useHistory();
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const path = window.location.pathname;

  const userSettings = e => {
    e.preventDefault();
    history.push("/userSettings");
  };

  const newEntry = e => {
    // go to new entry page
    e.preventDefault();
    history.push("/newentry");
  };

  const returnToDash = e => {
    // return to main dashboard
    e.preventDefault();
    history.push("/");
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={userSettings}
          >
            <PersonIcon />
          </IconButton>
          {path === "/" ? (
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onClick={newEntry}
            >
              <FastfoodIcon />
            </Fab>
          ) : (
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onClick={returnToDash}
            >
              <CloseIcon />
            </Fab>
          )}

          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
