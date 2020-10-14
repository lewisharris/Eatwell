import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.button`
  background: ${props => props.theme.card};
  color: ${props => props.theme.error};
  box-sizing: border-box;
  font-size: 14px;
  border: 2px solid ${props => props.theme.error};
  border-radius: 10px;
  margin: 10px auto;
  min-width: 250px;
  width: 100%;
  max-width: 250px;
  padding: 10px 0px;
`;

const Text = styled.div``;

export default function ErrorNotice(props) {
  return (
    <>
      {props.message ? (
        <ErrorMessage onClick={props.clearError}>
          {" "}
          <Text>{props.message}</Text>{" "}
        </ErrorMessage>
      ) : null}
    </>
  );
}
