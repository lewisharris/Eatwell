import React, { useState, useContext, useEffect } from "react";
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
import LoadingIcon from "../reusablecomponents/LoadingIcon";
import AuthFormContainer from "../misc/AuthFormContainer";
import SideImage from "../misc/SideImage";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();
  const [splitScreen, setSplitScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  let windowWidth = window.innerWidth;

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const getViewport = () => {
    windowWidth = window.innerWidth;
    if (windowWidth > 1050) {
      setSplitScreen(true);
    } else {
      setSplitScreen(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // create new user
      const newUser = {
        email,
        password,
        passwordCheck,
        username,
      };
      if (newUser) {
        setLoading(true);
      }
      await axios.post(
        "https://eatwell-back-end.onrender.com/users/register",
        newUser
      );

      //log new user in
      const loginResponse = await axios.post(
        "https://eatwell-back-end.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      await setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.msg);
    }
  };

  const goToLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    getViewport();
    window.addEventListener("resize", () => getViewport());
    window.removeEventListener("resize", getViewport);
  }, [windowWidth]);

  return loading === true ? (
    <AuthPageBg>
      <LoadingIcon />
    </AuthPageBg>
  ) : (
    <AuthPageBg>
      <div>{splitScreen ? <SideImage alt="front image" /> : null}</div>
      <AuthFormContainer>
        <Logo />
        <Form onSubmit={submitForm}>
          <H3>Sign Up</H3>

          <Input
            label="Email*"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password*"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <Input
            label="Verify Password*"
            name="password-confirm"
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
          />
          <Input
            label="Username*"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit" text="Register" onClick={(e) => submitForm(e)}>
            Register
          </Button>
          <ErrorNotice
            message={error}
            clearError={(e) => {
              e.preventDefault();
              setError(undefined);
            }}
          />
          <button type="button" onClick={goToLogin}>
            <P>Already have an account?</P>
            <P>Sign In </P>
          </button>
        </Form>
      </AuthFormContainer>
    </AuthPageBg>
  );
}
