import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import AuthPageBg from "../misc/AuthPageBg";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import Input from "../reusablecomponents/Input";
import Button from "../reusablecomponents/Button";
import P from "../reusablecomponents/P";
import Logo from "../reusablecomponents/Logo";
import LoadingIcon from "../reusablecomponents/LoadingIcon";
import SideImage from "../misc/SideImage";
import Runner from "../../images/runner.jpg";
import AuthFormContainer from "../misc/AuthFormContainer";

export default function Login() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [splitScreen, setSplitScreen] = useState(false);
  let windowWidth = window.innerWidth;
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async e => {
    try {
      e.preventDefault();
      const loginUser = {
        email,
        password
      };
      if (loginUser) {
        setLoading(true);
      }
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
        setLoading(false);
        setError(err.response.data.msg);
      }
    }
  };

  const getViewport = () => {
    windowWidth = window.innerWidth;
    if (windowWidth > 700) {
      setSplitScreen(true);
    } else {
      setSplitScreen(false);
    }
  };

  const goToRegister = () => {
    history.push("/register");
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
      <div>
        {splitScreen ? <SideImage src={Runner} alt="front image" /> : null}
      </div>
      <AuthFormContainer>
        <Logo />
        <Form onSubmit={submitForm}>
          <H3>Sign In</H3>
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            type="text"
          />

          <Button type="submit" onClick={submitForm} text="Sign in">
            Log in
          </Button>
          <ErrorNotice
            message={error}
            clearError={e => {
              e.preventDefault();
              setError(undefined);
            }}
          />
          <div onClick={goToRegister}>
            <P>Not yet registered?</P>
            <P>Sign up </P>
          </div>
        </Form>
      </AuthFormContainer>
    </AuthPageBg>
  );
}
