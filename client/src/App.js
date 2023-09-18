import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import UserSettings from "./components/pages/UserSettings";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layouts/Header";
import "./App.css";
import axios from "axios";
import UserContext from "./context/userContext";
import theme from "./theme/theme";
import RecordFood from "./components/foodhandling/RecordFood";
import SearchFood from "./components/pages/SearchFood";

// Root App

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  //set context state to user
  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem("auth-token");
      console.log(JSON.stringify(token)); //set token to equal local storage token
      if (token === null) {
        // if token doesnt exist (it wont on first load) then create it in local storage and set it to an empty string
        localStorage.setItem("auth-token", "");
        token = "";
      }
      //send token to back end
      const tokenResponse = await axios.post(
        "https://eatwell-back-end.onrender.com/users/tokenisvalid/",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await axios.get(
          "https://eatwell-back-end.onrender.com/users/",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({ token, user: userResponse.data });
      }
    };
    checkLogin();
  }, []);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/userSettings" component={UserSettings} />
              <Route path="/searchFood" component={SearchFood} />
              <Route path="/newentry" component={RecordFood} />
            </Switch>
          </UserContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
