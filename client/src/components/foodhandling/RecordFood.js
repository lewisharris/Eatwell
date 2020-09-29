import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function RecordFood() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [calories, setCalories] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const submitForm = async e => {
    e.preventDefault();
    try {
      const newFood = {
        title,
        description,
        calories
      };
      await axios.post("http://localhost:5000/list", newFood);
      const dataResponse = await axios.post(
        "http://localhost:5000/users/list",
        {
          title,
          description,
          calories
        }
      );
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
        <label htmlFor="food-description">Description*</label>
        <input
          onChange={e => setDescription(e.target.value)}
          id="food-description"
          type="text"
        />
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
