import React, { useContext, useEffect, useState, useRef } from "react";
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
import ScrollList from "../reusablecomponents/ScrollList";
import ErrorNotice from "../misc/ErrorNotice";
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
  const submitBtn = useRef(null);
  const inputField = useRef(null);

  // User data
  const { userData } = useContext(UserContext);
  // Form field which will send query to server
  const [searchData, setSearchData] = useState("");
  // List of food items retrieved from server
  const [foodList, setFoodList] = useState(null);
  // List of food items retrieved from server
  const [foodSelection, setFoodSelection] = useState({ food: "", calories: 0 });
  // Set Button Text
  const [buttonText, setButtonText] = useState("Add Food");
  //Calories
  const [calories, setCalories] = useState("");
  //Error Message for form
  const [error, setError] = useState("");
  //weight form input
  const [weight, setWeight] = useState(null);

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

  // Set time of meal
  const [mealType, setMealType] = useState(calculateTime);

  //Render list of foods
  const renderList = () => {};

  const submitSearch = async (e) => {
    e.preventDefault();
    if (searchData.length === 0) {
      setError("No Food Entered");
      return;
    }
    // Send form field to Server as get request with query
    await axios
      .get(
        `https://eatwell-bve3.vercel.app/food/foodsearch?search=${searchData}`,
        {
          searchData: searchData,
        }
      )
      // Set food list to data retrieved
      .then((res) => {
        const food = res.data;
        setFoodList(food);
      })
      // set food list to error message
      .catch((err) => {
        setError("no food entered");
      });
  };

  const selectFood = (choice) => {
    setFoodSelection({ food: choice.food, calories: choice.calories });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const newFood = {
        title: foodSelection.food,
        mealType,
        calories: Math.floor(foodSelection.calories),
      };
      setMealType("breakfast");
      setCalories("");
      setError("");
      await axios
        .post("https://eatwell-bve3.vercel.app/list", newFood, {
          headers: { "x-auth-token": userData.token },
        })
        .then(() => {
          history.push("/");
        });
      setButtonText("Added!");
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
        setTimeout(() => {
          setButtonText("Add Food");
        }, 1500);
      }
    }
  };

  const returnToDash = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          submitSearch(e);
        }}
      >
        <H3>Look up food</H3>
        <Input
          label="Search"
          onChange={(e) => setSearchData(e.target.value)}
          type="text"
          ref={inputField}
        />{" "}
        <Button
          type="submit"
          onClick={(e) => submitSearch(e)}
          text="Search Food"
        />
        <P> Results</P>
        <ScrollList foodList={foodList} selectFood={selectFood} />
        <Input
          label="Weight (g)"
          type="text"
          onChange={(e) => {
            setWeight(parseInt(e.target.value));
          }}
        />
        <Select
          value={mealType}
          label="MealType"
          type="select"
          onChange={(e) => setMealType(e.target.value)}
          options={["breakfast", "lunch", "dinner", "snack"]}
        />
        <P>
          Calories:
          {!foodSelection.calories
            ? 0
            : ` ${Math.floor(foodSelection.calories * weight) / 100} Kcal`}
        </P>
        <Button
          type="submit"
          onClick={(e) => submitForm(e)}
          text={buttonText}
          ref={submitBtn}
        />
        <Button type="submit" onClick={(e) => returnToDash(e)} text="Done" />
        <ErrorNotice
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
      </Form>
      <AppNav />
    </>
  );
}
