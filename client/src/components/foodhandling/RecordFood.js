import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import AppNav from "../layouts/AppNav";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Button, TextField } from "@material-ui/core";

//Component Styling
const RecordFoodPage = styled.div`
  background: ${props => props.theme.primary};
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
`;

//Component
export default function RecordFood(props) {
  const [title, setTitle] = useState("");

  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
  });

  const calculateTime = () => {
    const time = new Date();
    const hour = time.getHours();

    if (hour > 4 && hour < 11) {
      return "breakfast";
    } else if (hour >= 11 && hour < 16) {
      return "lunch";
    } else if (hour >= 16 && hour < 23) {
      return "dinner";
    } else {
      return "snack";
    }
  };

  const [mealType, setMealType] = useState(calculateTime);

  const submitForm = async e => {
    e.preventDefault();
    try {
      const newFood = {
        title,
        mealType,
        calories
      };
      setMealType("breakfast");
      setCalories("");
      setError("");
      await axios
        .post("http://localhost:5000/list", newFood, {
          headers: { "x-auth-token": userData.token }
        })
        .then(() => {
          history.push("/");
        });
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  return (
    <RecordFoodPage>
      <Form onSubmit={submitForm}>
        <FastfoodIcon fontSize="large" color="secondary" />
        <H3>Log New Meal</H3>
        <label htmlFor="food-title">Meal/Food*</label>
        <TextField
          label="Meal/Food*"
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="meal-type">Meal Type</label>

        <select
          value={mealType}
          id="meal-type"
          onChange={e => setMealType(e.target.value)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <TextField
          label="Calories*"
          type="text"
          onChange={e => setCalories(e.target.value)}
        />
        <Button type="submit" color="secondary" variant="outlined">
          Add
        </Button>
        <ErrorNotice
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
      </Form>
      <AppNav />
    </RecordFoodPage>
  );
}
