import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import UserContext from "../../context/userContext";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import Input from "../reusablecomponents/Input";
import AppNav from "../layouts/AppNav";
import axios from "axios";

//styling
const UserSettingsPage = styled.div`
  background: ${props => props.theme.primary};
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
`;

//component
export default function UserSettings(props) {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const [stats, setStats] = useState();
  const [calories, setCalories] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
    if (!stats) {
      getUserStats();
    }
    if (stats) {
      setHeight(stats.height);
      setWeight(stats.weight[stats.weight.length - 1]);
      setCalories(stats.targetCalories);
    }
  }, [stats]);

  //get initial data from databse for user stats
  const getUserStats = () => {
    const userId = userData.user.id;
    axios
      .get(`http://localhost:5000/stats/${userId}`, {
        headers: { "x-auth-token": userData.token }
      })
      .then(res => setStats(res.data[0]))
      .catch(err => console.log(err));
  };

  const submitForm = e => {
    e.preventDefault();
    const userId = userData.user.id;
    const userStats = {
      height,
      weight,
      calories
    };
    axios
      .put(
        `http://localhost:5000/stats/update/${userId}`,
        {
          height: userStats.height,
          weight: userStats.weight,
          targetCalories: userStats.calories
        },
        { headers: { "x-auth-token": userData.token } }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    history.push("/");
  };

  return (
    <UserSettingsPage>
      <Form
        onSubmit={e => {
          submitForm(e);
        }}
      >
        <H3>Update Details</H3>
        <Input
          label="Height (cm)"
          type="text"
          value={height}
          name="height"
          onChange={e => setHeight(e.target.value)}
        />
        <Input
          label="Weight (Kg)"
          type="text"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
        <Input
          label="Target Calories (Kcal)"
          type="text"
          value={calories}
          onChange={e => setCalories(e.target.value)}
        />
        <Button type="submit" color="secondary" variant="outlined">
          Update Details
        </Button>
      </Form>
      <AppNav />
    </UserSettingsPage>
  );
}
