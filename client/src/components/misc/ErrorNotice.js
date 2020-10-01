import React from "react";
import styled from "styled-components";

const Container = styled.div``;

//fix bug, component must show nothing when error is cleared
export default function ErrorNotice(props) {
  return (
    <Container className="error-notice">
      <button onClick={props.clearError}>
        <span>{props.message}</span>
      </button>
    </Container>
  );
}
