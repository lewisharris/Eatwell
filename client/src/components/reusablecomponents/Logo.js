import styled from "styled-components";
import React from "react";
import logo from "../../images/logo.png";
import P from "./P";

const Img = styled.img`
  margin: 0px auto;
  flex-grow: 0;
  width: 60px;
`;

export default function Logo() {
  return (
    <>
      <Img src={logo} />
    </>
  );
}
