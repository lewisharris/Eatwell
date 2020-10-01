import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layouts/Header";
import "./App.css";
import axios from "axios";
import UserContext from "./context/userContext";
import { Container } from "@material-ui/core";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  //set context state to user
  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem("auth-token"); //set token to equal local storage token
      if (token === null) {
        // if token doesnt exist (it wont on first load) then create it in local storage and set it to an empty string
        localStorage.setItem("auth-token", "");
        token = "";
      }
      //send token to back end
      const tokenResponse = await axios.post(
        "http:/localhost:5000/users/tokenisvalid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await axios.get("http:/localhost:5000/users/", {
          headers: { "x-auth-token": token }
        });
        setUserData({ token, user: userResponse.data });
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Container maxWidth="md">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Container>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
