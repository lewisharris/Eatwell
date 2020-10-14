import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 14px;
  max-width: 100px;
  font-weight: 800;
  margin: 10px auto;
`;

export default function Input(props) {
  const { text, onClick } = props;
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
}
