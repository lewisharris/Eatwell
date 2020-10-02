import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.button`
  background: ${props => props.theme.error};
  color: ${props => props.theme.textPrimary};
  box-sizing: border-box;
  border-radius: 2px;
  margin: 10px 0px;
`;

export default function ErrorNotice(props) {
  return (
    <ErrorMessage onClick={props.clearError}>
      <span>{props.message}</span>
    </ErrorMessage>
  );
}
