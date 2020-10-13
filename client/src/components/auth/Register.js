import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import AuthPageBg from "../misc/AuthPageBg";
import Input from "../reusablecomponents/Input";
import Button from "../reusablecomponents/Button";
import P from "../reusablecomponents/P";
import Logo from "../reusablecomponents/Logo";

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

  const goToLogin = () => {
    history.push("/login");
  };

  return (
    <AuthPageBg>
      <Logo />
      <Form onSubmit={submitForm}>
        <H3>Sign Up</H3>

        <Input
          label="Email"
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          label="Password*"
          name="password"
          onChange={e => setPassword(e.target.value)}
          type="password"
        />

        <Input
          label="Verify Password*"
          name="password-confirm"
          onChange={e => setPasswordCheck(e.target.value)}
          type="password"
        />
        <Input
          label="Username"
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
        <Button type="submit" text="Register">
          Register
        </Button>
        <ErrorNotice
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
        <button type="button" onClick={goToLogin}>
          <P>Already have an account?</P>
          <P>Sign In </P>
        </button>
      </Form>
    </AuthPageBg>
  );
}
