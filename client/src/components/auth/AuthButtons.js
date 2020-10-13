import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import styled from "styled-components";
import AssessmentIcon from "@material-ui/icons/Assessment";

//Component styling

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10vw;
  width: 100vw;
  height: 60px;
  background: ${props => props.theme.dark};
`;
const Logo = styled.h1`
  padding: 0px;
  margin: 0px;
  height: 60px;
  line-height: 60px;
  position: absolute;
  top: 0px;
  left: 5vw;
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

  const logout = e => {
    e.preventDefault();
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <>
      {userData.user ? (
        <Header>
          <Logo>EatWell</Logo>
          <AssessmentIcon />
          <button onClick={logout} type="body1" edge="end" color="inherit">
            Log out
          </button>
        </Header>
      ) : null}
    </>
  );
}
