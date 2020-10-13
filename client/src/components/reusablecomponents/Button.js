import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  background: black;
  color: white;
  max-width: 100px;
  font-weight: 700;
  margin: 10px auto;
`;

export default function Input(props) {
  const { text, onClick } = props;
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
}
