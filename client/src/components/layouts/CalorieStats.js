import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";

const Stats = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const P = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 16px;
  padding: 0px 2vw;
`;

const Span = styled.span`
  color: ${props => {
    if (props.leftCal <= 0 && props.remaining) {
      return props.theme.error;
    } else {
      return props.theme.textPrimary;
    }
  }};
  font-size: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
  width: 100vw;
  background: #262626;
`;

export default function CalorieStats(props) {
  const history = useHistory();
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
        <Stats>
          <P>
            Goal:<Span> {targetCal}Kcal</Span>
          </P>
          <P>
            Used:<Span> {usedCal}Kcal</Span>
          </P>
          <P>
            Left:
            <Span leftCal={leftCal} remaining>
              {leftCal}Kcal
            </Span>
          </P>
        </Stats>
      </Container>
      <WelcomeMessage name={props.name} leftCal={leftCal} />
    </>
  );
}
