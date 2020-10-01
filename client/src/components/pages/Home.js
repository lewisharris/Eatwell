import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import RecordFood from "../foodhandling/RecordFood";
import DailyDiary from "../layouts/DailyDiary";

export default function Home() {
  const { userData } = useContext(UserContext);
  const [listData, setListData] = useState([]);

  const [name, setName] = useState();
  const history = useHistory();

  async function getUsername() {
    let name = await userData.user.username;
    await setName(name);
  }

  async function getFood() {
    await axios
      .get("http://localhost:5000/list/all", {
        headers: { "x-auth-token": userData.token }
      })
      .then(res => {
        setListData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function removeFood(id) {
    await axios
      .delete(`http://localhost:5000/list/${id}`, {
        headers: { "x-auth-token": userData.token }
      })
      .then(() => {
        getFood();
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
    getFood();
    getUsername();
  }, [userData]);

  return (
    <div>
      Hi {name}, lets see how your meal tracking is going today
      <RecordFood getFood={getFood} />
      <DailyDiary data={listData} delete={removeFood} />
    </div>
  );
}
