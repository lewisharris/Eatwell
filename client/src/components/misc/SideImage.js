import React from "react";
import styled from "styled-components";
import Runner from "../../images/runner.jpg";
import Board from "../../images/board.jpg";

const imageArray = [Runner, Board];

const Image = styled.img`
  height: 100vh;
  filter: sepia() hue-rotate(140deg);
`;

const SideImage = () => {
  return <Image src={Board} />;
};

export default SideImage;
