import React from "react";
import styled from "styled-components";

const CircleStyle = styled.button`
  width: 14vw;
  max-width: 80px;
  height: 14vw;
  max-height: 80px;
  border-radius: 50px;
  color: lightcoral;
  padding: 10px;
  margin: 1vw;
  box-sizing: border-box;
  flex-shrink: 0;
  border: 2px solid lightcoral;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :active {
    outline: none;
    background: lightcoral;
    color: white;
  }
  :focus {
    outline: none;
    background: lightcoral;
    color: white;
  }
`;

const P = styled.p`
  font-size: 10px;
  text-align: center;
`;

export default function Circle(props) {
  return (
    <CircleStyle>
      <P>Fri</P>
      <P>Oct 09</P>
    </CircleStyle>
  );
}
