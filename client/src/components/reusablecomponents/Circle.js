import React from "react";
import styled from "styled-components";

const CircleStyle = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: lightcoral;
  color: white;
  padding: 10px;
  margin: 1vw;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export default function Circle(props) {
  return <CircleStyle>{props.date}</CircleStyle>;
}
