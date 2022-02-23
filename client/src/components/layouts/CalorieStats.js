import React from "react";
import styled from "styled-components";
import WelcomeMessage from "./WelcomeMessage";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0px auto;
  height: 40px;
  background: ${props => props.theme.background};
  max-width: ${props => props.theme.maxWidth};
`;

const P = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 12px;
  font-weight: 600;
  margin: 0px auto;
  line-height: 40px;
`;

const Span = styled.span`
  color: ${props => {
    if (props.leftCal <= 0 && props.remaining) {
      return props.theme.error;
    } else {
      return props.theme.textPrimary;
    }
  }};
  font-size: 12px;
  font-weight: 600;
`;

export default function CalorieStats(props) {
  const targetCal = parseInt(props.targetCal);
  const usedCal = props.data
    .map(item => {
      return parseInt(item.calories);
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const leftCal = targetCal - usedCal;

  return (
    <>
      <Container>
        <P>
          Goal:<Span> {targetCal}Kcal</Span>
        </P>
        <P>
          Used:<Span> {usedCal}Kcal</Span>
        </P>
        <P>
          Left:{" "}
          <Span leftCal={leftCal} remaining>
            {leftCal}Kcal
          </Span>
        </P>
      </Container>
      <WelcomeMessage name={props.name} leftCal={leftCal} />
    </>
  );
}
