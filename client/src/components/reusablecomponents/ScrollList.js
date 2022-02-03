import React from "react";
import styled from "styled-components";
import FoodCard from "./FoodCard";

const Container = styled.div`
  max-height: 200px;
  width: 100%;
  list-style-type: none;
  overflow: scroll;
  text-align: center;
`;

const ScrollList = props => {
  const foodList = props.foodList;
  return (
    <Container>
      {foodList === null
        ? console.log("none")
        : foodList.hints.map(item => {
            return <FoodCard food={item.food.label} id={item.food.foodId} />;
          })}
    </Container>
  );
};

export default ScrollList;
