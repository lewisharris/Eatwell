import React from "react";
import styled from "styled-components";

const Arrow = styled.button`
  width: 20px;
  background: none;
  box-sizing: border-box;
  height: 20px;
  border-top: 2px solid lightcoral;
  border-left: 2px solid lightcoral;
  transform: ${props => {
    if (props.action === "prev") {
      return "translateY(-50%) rotate(-45deg)";
    } else {
      return "translateY(-50%) rotate(135deg)";
    }
  }};
  position: absolute;
  top: 50%;
  left: ${props => {
    if (props.action === "prev") {
      return "0px";
    } else {
      return "";
    }
  }};
  right: ${props => {
    if (props.action === "next") {
      return "0px";
    } else {
      return "";
    }
  }};
  :active {
    outline: none;
    border-top: 2px solid darkred;
    border-left: 2px solid darkred;
  }
  :focus {
    outline: none;
  }
`;

export default function PrevNextDate(props) {
  return (
    <>
      <Arrow action={props.action} />
    </>
  );
}
