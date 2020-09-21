import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [name, setName] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async e => {
    e.preventDefault();
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
  };

  return (
    <div onSubmit={submitForm}>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="register-email">
          Email(this will be your username)
        </label>
        <input
          id="register-email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="register-password">Password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          id="register-password"
          type="text"
        />
        <input
          onChange={e => setPasswordCheck(e.target.value)}
          id="register-verify-password"
          placeholder="verify password"
          type="text"
        />
        <label htmlFor="register-name">Name</label>
        <input
          id="register-name"
          type="text"
          onChange={e => setName(e.target.value)}
        />
        <input id="submit" type="submit" value="register" />
      </form>
    </div>
  );
}
