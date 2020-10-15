import React from "react";
import styled from "styled-components";
import Runner from "../../images/runner.jpg";
import Bike from "../../images/bike.jpg";
import Surfer from "../../images/surfer.jpg";
import WindSurfer from "../../images/wind-surfer.jpg";
import TeamBasketball from "../../images/team-basketball.jpg";
import Basketball from "../../images/basketball.jpg";
import Cyclist from "../../images/cyclist.jpg";

const imageArray = [
  Runner,
  Bike,
  Surfer,
  WindSurfer,
  TeamBasketball,
  Basketball
];
const random = Math.floor(Math.random() * (imageArray.length - 1));

const Container = styled.div`
  height: 100vh;
  max-width: 1400px;
  min-width: 600px;
  width: 40vw;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  filter: sepia() hue-rotate(140deg);
  animation: shrink 6s ease-in-out 0s forwards;
  @keyframes shrink {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1);
    }
  }
`;

const SideImage = () => {
  return (
    <Container>
      <Image src={imageArray[random]} />
    </Container>
  );
};

export default SideImage;

//<Image src={Board} />;
