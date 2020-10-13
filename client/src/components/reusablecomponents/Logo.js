import styled from "styled-components";
import React from "react";
import logo from "../../images/logo.png";
import P from "./P";

const Img = styled.img`
  margin: 5vh auto;
  width: 50px;
`;

export default function Logo() {
  return (
    <>
      <Img src={logo} />
    </>
  );
}
