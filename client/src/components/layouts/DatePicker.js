import React from "react";
import styled from "styled-components";
import Circle from "../reusablecomponents/Circle";
import PrevNextDate from "../reusablecomponents/PrevNextDate";
import moment from "moment";

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

function createDate(offset) {
  return moment().subtract(offset, "days");
}
function formatDate(d) {
  const date = d._d
    .toString()
    .split(" ")
    .slice(1, 3)
    .join(" ");
  return date;
}

// dates
const yesterday = createDate(1);
const formatYday = formatDate(yesterday);
console.log(formatYday);

const wednesday = createDate(2);
const formatWed = formatDate(wednesday);
console.log(formatWed);

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
