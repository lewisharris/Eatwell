import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 14px;
  max-width: 100px;
  font-weight: 800;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  :hover {
    color: ${props => props.theme.background};
    background: ${props => props.theme.primary};
    -webkit-box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
    -moz-box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
    box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
  }
`;

export default function Input(props) {
  const { text, onClick } = props;
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
}
