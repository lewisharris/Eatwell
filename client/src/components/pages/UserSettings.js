import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../reusablecomponents/Button";
import UserContext from "../../context/userContext";
import Form from "../reusablecomponents/Form";
import Input from "../reusablecomponents/Input";
import AppNav from "../layouts/AppNav";
import UserProfile from "../layouts/UserProfile";
import axios from "axios";

import InputPages from "../misc/InputPages";

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
      .get(`https://eatwell-bve3.vercel.app/stats/${userId}`, {
        headers: { "x-auth-token": userData.token },
      })
      .then((res) => {
        setStats(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userId = userData.user.id;
    const userStats = {
      height,
      weight,
      calories,
    };
    axios
      .put(
        `https://eatwell-bve3.vercel.app/stats/update/${userId}`,
        {
          height: userStats.height,
          weight: userStats.weight,
          targetCalories: userStats.calories,
        },
        { headers: { "x-auth-token": userData.token } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    history.push("/");
  };
  return (
    <InputPages>
      <UserProfile height={height} weight={weight} calories={calories} />
      <Form
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <Input
          inactive
          label="Height (cm)"
          placeholder={"Enter Height"}
          type="number"
          value={height}
          name="height"
          onChange={(e) => setHeight(e.target.value)}
        />
        <Input
          inactive
          label="Weight (Kg)"
          placeholder={"Enter Weight"}
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          inactive
          label="Target Calories (Kcal)"
          type="number"
          value={calories}
          placeholder={"Enter Calories"}
          onChange={(e) => setCalories(e.target.value)}
        />
        <Button type="submit" onClick={(e) => submitForm(e)} text="Update" />
      </Form>
      <AppNav />
    </InputPages>
  );
}
