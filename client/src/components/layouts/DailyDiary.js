import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

export default function DailyDiary() {
  const [foodData, setFoodData] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/list/all", {
        headers: { "x-auth-token": userData.token }
      })
      .then(res => {
        setFoodData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userData]);

  return (
    <div>
      <ul>
        {foodData.length === 0 ? (
          <li key={0}>No Entries</li>
        ) : (
          foodData.map(item => <li key={item._id}>{item.title}</li>)
        )}
      </ul>
    </div>
  );
}
