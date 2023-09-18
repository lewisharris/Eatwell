import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import AppNav from "../layouts/AppNav";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import Button from "../reusablecomponents/Button";
import Input from "../reusablecomponents/Input";
import Select from "../reusablecomponents/Select";

//Component Styling
const RecordFoodPage = styled.div``;

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

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const newFood = {
        title,
        mealType,
        calories,
      };
      setMealType("breakfast");
      setCalories("");
      setError("");
      await axios
        .post("https://eatwell-back-end.onrender.com/list", newFood, {
          headers: { "x-auth-token": userData.token },
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
        <H3>Log New Meal</H3>
        <Input
          label="Meal/Food*"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          value={mealType}
          label="MealType"
          type="select"
          onChange={(e) => setMealType(e.target.value)}
          options={["breakfast", "lunch", "dinner", "snack"]}
        />
        <Input
          label="Calories*"
          type="text"
          onChange={(e) => setCalories(e.target.value)}
        />
        <Button type="submit" onClick={submitForm} text="Add" />
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
