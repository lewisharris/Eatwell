import React from "react";
import styled from "styled-components";
import Circle from "../reusablecomponents/Circle";
import PrevNextDate from "../reusablecomponents/PrevNextDate";

const Container = styled.div`
  width: 90vw;
  position: relative;
  max-width: 700px;
  margin: 0px auto;
  display:flex;
  flex-direction:row;
  justify-content:center;
  }
`;

export default function DatePicker() {
  return (
    <Container>
      <PrevNextDate action="prev" />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <PrevNextDate action="next" />
    </Container>
  );
}
