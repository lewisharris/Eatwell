import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

export default function DailyDiary() {
  const [foodData, setFoodData] = useState();
  const { userData } = useContext(UserContext);

  const displayFood = () => {
    if (foodData === undefined) {
      return (
        <tr>
          <td></td>
          <td>no entries</td>
          <td></td>
        </tr>
      );
    } else {
      foodData.map(item => {
        return (
          <tr>
            <td>{item.title}</td>
            <td>{item.calories}</td>
            <td>remove</td>
          </tr>
        );
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/list/all", {
        headers: { "x-auth-token": userData.token }
      })
      .then(res => {
        setFoodData(res.data);
      })
      .then(() => {
        displayFood();
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Breakfast</h3>
      <table>
        <thead>
          <tr>Food</tr>
          <tr>Calories</tr>
          <tr>Remove</tr>
        </thead>
        <tbody>{displayFood()}</tbody>
      </table>
    </div>
  );
}
