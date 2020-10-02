import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import CalorieStats from "../layouts/CalorieStats";
import DailyDiary from "../layouts/DailyDiary";
import AppNav from "../layouts/AppNav";
import { Typography } from "@material-ui/core/";

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
      <CalorieStats />
      <Typography variant="body1">
        Hi {name}, lets see how your meal tracking is going today
      </Typography>
      <DailyDiary data={listData} delete={removeFood} />
      <AppNav />
    </div>
  );
}
