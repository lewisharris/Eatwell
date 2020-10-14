import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import styled from "styled-components";
import Logo from "../../images/logo.png";

//Component styling

const Header = styled.div`
  position: relative;
  width: 100vw;
  height: 60px;
  background: ${props => props.theme.background};
  border-bottom: 2px solid ${props => props.theme.primary};
  -webkit-box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
  -moz-box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
  box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
`;

const LogOut = styled.button`
  box-sizing: border-box;
  font-size: 16px;
  color: white;
  font-weight: 600;
  background: none;
  position: absolute;
  top: 0px;
  line-height: 60px;
  height: 60px;
  right: 5vw;
`;

const Img = styled.img`
  position: absolute;
  top: 5px;
  height: 40px;
  left: 5vw;
`;

//Component
export default function AuthButtons() {
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
      {userData.user ? (
        <Header>
          <Img src={Logo} alt="EatWell" />
          <LogOut onClick={e => logout(e)} type="button">
            Log out
          </LogOut>
        </Header>
      ) : null}
    </>
  );
}
