import React from "react";
import styled from "styled-components";
import P from "./P";

const Container = styled.button`
  height: 50px;
  background: ${props => props.theme.background};
  width: 80%;
  padding: 10px;
  margin: 5px auto;
  border-radius: 10px;
  &:focus {
    background: ${props => props.theme.menu};
    border: 2px solid #eda509;
  }
`;

const FoodCard = props => {
  const { id, food } = props;
  return (
    <Container key={id}>
      <P>{food}</P>
    </Container>
  );
};

export default FoodCard;
