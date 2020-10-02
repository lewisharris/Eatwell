import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import UserContext from "../../context/userContext";

const Stats = styled.h1`
  position: absolute;
  top: 50%;
  left: 50vw;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const P = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 16px;
  padding: 0px 2vw;
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

export default function CalorieStats() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <>
      <Header>
        <Stats>
          <P>Goal: 2000</P>
          <P>Used: 1700</P>
          <P>Left: 1700</P>
        </Stats>
        <Button onClick={logout} type="body1" edge="end" color="inherit">
          Log out
        </Button>
      </Header>
    </>
  );
}
