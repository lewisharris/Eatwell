import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from "../reusablecomponents/Button";
import UserContext from "../../context/userContext";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import P from "../reusablecomponents/P";
import Input from "../reusablecomponents/Input";
import Select from "../reusablecomponents/Select";
import AppNav from "../layouts/AppNav";
import axios from "axios";
import { element } from "prop-types";
import FoodCard from "../reusablecomponents/FoodCard";
import ScrollList from "../reusablecomponents/ScrollList";
/*
Search Food Component
@ Input from user (Food search, eg. Chicken, Pasta etc)
@ Send query to server
@ Recieve data from Server
@ process and send data to child List components
@ User can add weight and component will calculate relative calories 
@ User can add chosen food and calorie to their food list
*/

// Component
export default function SearchFood(props) {
  const history = useHistory();

  // User data
  const { userData } = useContext(UserContext);
  // Form field which will send query to server
  const [searchData, setSearchData] = useState("");
  // List of food items retrieved from server
  const [foodList, setFoodList] = useState(null);
  // List of food items retrieved from server
  const [foodSelection, setFoodSelection] = useState({ food: "", calories: 0 });

  const [weight, setWeight] = useState(100);

  useEffect(() => {
    // If user is not logged in, then redirect to login page
    if (!userData.user) {
      history.push("/login");
      return;
    }
    renderList();
    console.log(foodList);
    //update every time the food list changes
  }, foodList);

  //Find current time and set default meal type
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

  //Render list of foods
  const renderList = () => {};

  const [mealType, setMealType] = useState(calculateTime);

  const submitSearch = async e => {
    e.preventDefault();
    // Send form field to Server as get request with query
    await axios
      .get(`http://localhost:5000/food/foodsearch?search=${searchData}`, {
        searchData: searchData
      })
      // Set food list to data retrieved
      .then(res => {
        const food = res.data;
        setFoodList(food);
      })
      // set food list to error message
      .catch(err => {
        console.log(err);
      });
  };

  const selectFood = choice => {
    setFoodSelection({ food: choice.food, calories: choice.calories });
  };

  const submitFood = () => {};

  const returnToDash = e => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      <Form
        onSubmit={e => {
          submitSearch(e);
        }}
      >
        <H3>Look up food</H3>
        <Input
          label="Search"
          onChange={e => setSearchData(e.target.value)}
          type="text"
        />{" "}
        <Button
          type="submit"
          onClick={e => submitSearch(e)}
          text="Search Food"
        />
        <P> Results</P>
        <ScrollList foodList={foodList} selectFood={selectFood} />
        <Input
          label="Weight (g)"
          type="text"
          onChange={e => {
            setWeight(parseInt(e.target.value));
          }}
        />
        <Select
          value={mealType}
          label="MealType"
          type="select"
          onChange={e => setMealType(e.target.value)}
          options={["breakfast", "lunch", "dinner", "snack"]}
        />
        <P>
          Calories:
          {!foodSelection.calories
            ? 0
            : ` ${(foodSelection.calories * weight) / 100} Kcal`}
        </P>
        <Button type="submit" onClick={e => submitFood(e)} text="Add Food" />
        <Button type="submit" onClick={e => returnToDash(e)} text="Done" />
      </Form>
      <AppNav />
    </>
  );
}
