import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import styled from "styled-components";
import { Button } from "@material-ui/core/";

//Component styling
const Logo = styled.h1`
  position: absolute;
  top: 50%;
  left: 3vw;
  transform: translateY(-50%);
`;
const Header = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10vw;
  width: 100vw;
  height: 60px;
  background: ${props => props.theme.primary};
`;

//Component
export default function AuthButtons() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = e => {
    e.preventDefault();
    history.push("/register");
  };
  const login = e => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <>
      {userData.user ? null : (
        <Header>
          <Logo>EatWell</Logo>
          <Button onClick={register}>Register</Button>
          <Button onClick={login}>Log In</Button>
        </Header>
      )}
    </>
  );
}
