import React from "react";
import styled from "styled-components";
import Circle from "../reusablecomponents/Circle";
import ReactWeeklyDayPicker from "react-weekly-day-picker";

const Container = styled.div`
  width: 90vw;
  position: relative;
  max-width: 700px;
  margin: 0px auto;
  }
`;

export default function DatePicker() {
  const classNames = {
    container: "",
    prevWeekArrow: "",
    nextWeekArrow: "",
    dayBox: "",
    dayCircleContainer: "",
    dayCircle: "",
    dayCircleTodayText: "",
    dayCircleUnavailable: "",
    dayCircleUnavailableText: "",
    dayCicleSelected: ""
  };
  return (
    <Container>
      <ReactWeeklyDayPicker
        classNames={classNames}
        startDay={new Date()}
        multipleDaySelect={false}
        beforeToday={true}
      />
    </Container>
  );
}
