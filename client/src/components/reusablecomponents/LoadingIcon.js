import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0px auto;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translateY(-50%) translateX(-50%);
`;
const Circle = styled.div`
  width: 30vw;
  max-width: 200px;
  height: 30vw;
  max-height: 200px;
  border-radius: 30vw;
  border: 3px solid ${props => props.theme.primary};
  margin: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  box-shadow: 0px 0px 40px ${props => props.theme.primary},
    inset 0px 0px 40px ${props => props.theme.primary};

  }
`;

const Overlay = styled.div`
  width: 30vw;
  max-width: 200px;
  height: 30vw;
  max-height: 200px;
  background: ${props => props.theme.background};
  opacity: 0.9;
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  transform-origin: top left;
  animation: spin 1s linear 0ms infinite forwards;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
  :after {
    content: "";
    width: 5vw;
    max-width: 200px;
    height: 5vw;
    max-height: 200px;
    border-radius: 10vw;
    border: 3px solid ${props => props.theme.primary};
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    transform: translateY(-50%) translateX(-50%);
    box-shadow: 0px 0px 40px ${props => props.theme.primary},
      inset 0px 0px 40px ${props => props.theme.primary};
    animation: none;
  }
`;
export default function LoadingIcon() {
  return (
    <Container>
      <Circle />
      <Overlay />
    </Container>
  );
}
