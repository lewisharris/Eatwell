import styled from "styled-components";
import React from "react";
import logo from "../../images/logo.png";

const Img = styled.img`
  flex-grow: 0;
  width: ${window.innerWidth > 105 - 0 ? "130px" : "60px"};
`;

export default function Logo() {
  return (
    <>
      <Img src={logo} />
    </>
  );
}
