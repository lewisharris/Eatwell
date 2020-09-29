import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

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
    <div>
      <ErrorNotice
        message={error}
        clearError={() => {
          setError(undefined);
        }}
      />
      <h2>Log in</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="login-password">Password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          id="login-password"
          type="text"
        />
        <input id="submit" type="submit" value="login" />
      </form>
    </div>
  );
}
