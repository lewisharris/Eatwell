import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import CalorieStats from "../layouts/CalorieStats";
import DailyDiary from "../layouts/DailyDiary";
import AppNav from "../layouts/AppNav";
import DatePicker from "../layouts/DatePicker";

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0px auto 50px auto;
`;

export default function Home() {
  const { userData } = useContext(UserContext);
  const [listData, setListData] = useState([]);
  const [targetCal, setTargetCal] = useState(0);

  const [name, setName] = useState();
  const history = useHistory();

  async function getUsername() {
    let name = await userData.user.username;
    await setName(name);
  }

  async function getFood() {
    await axios
      .get("https://eatwell-bve3.vercel.app/list/all", {
        headers: { "x-auth-token": userData.token },
      })
      .then((res) => {
        setListData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function removeFood(id) {
    await axios
      .delete(`https://eatwell-bve3.vercel.app/list/${id}`, {
        headers: { "x-auth-token": userData.token },
      })
      .then(() => {
        getFood();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const setTargetCalories = async () => {
    await axios
      .get(`https://eatwell-virid.vercel.app/${userData.id}`, {
        headers: { "x-auth-token": userData.token },
      })
      .then((res) => {
        const cal = res.data.length === 0 ? 2000 : res.data[0].targetCalories;
        setTargetCal(cal);
      });
  };

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
    getFood();
    getUsername();
    setTargetCalories();
  }, [userData]);

  return (
    <div>
      <Container>
        <CalorieStats targetCal={targetCal} data={listData} name={name} />
        {
          //<DatePicker />
        }
        <DailyDiary data={listData} delete={removeFood} />
      </Container>
      <AppNav />
    </div>
  );
}
