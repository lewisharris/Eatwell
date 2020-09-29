import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function RecordFood() {
  const [title, setTitle] = useState();
  const [mealType, setMealType] = useState("breakfast");
  const [calories, setCalories] = useState();
  const [error, setError] = useState();
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async e => {
    e.preventDefault();
    try {
      const newFood = {
        title,
        mealType,
        calories
      };
      await axios.post("http://localhost:5000/list", newFood, {
        headers: { "x-auth-token": userData.token }
      });
      history.push("/");
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  return (
    <div onSubmit={submitForm}>
      <h2>Log new meal</h2>
      <ErrorNotice
        message={error}
        clearError={() => {
          setError(undefined);
        }}
      />
      <form>
        <label htmlFor="food-title">Meal/Food*</label>
        <input
          id="food-title"
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="meal-type">Meal Type</label>

        <select
          value={mealType}
          id="meal-type"
          onChange={e => setMealType(e.target.value)}
        >
          <option value="breakfasr">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <label htmlFor="food-calories">Calories*</label>
        <input
          id="food-calories"
          type="text"
          onChange={e => setCalories(e.target.value)}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
