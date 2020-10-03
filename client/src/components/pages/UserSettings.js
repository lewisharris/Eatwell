import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import { Button, TextField } from "@material-ui/core";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import AppNav from "../layouts/AppNav";
import axios from "axios";

const UserSettingsPage = styled.div`
  background: ${props => props.theme.primary};
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
`;

export default function UserSettings() {
  const { userData, setUserData } = useContext(UserContext);
  const [username, setUsername] = useState("lewis");
  const [height, setHeight] = useState("190");
  const [weight, setWeight] = useState("30");
  const [targetCalories, setTargetCalories] = useState("1000");

  const goHome = e => {
    e.preventDefault();
    history.push("/");
  };

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
  });
  const updateDetails = () => {};

  const history = useHistory();

  return (
    <UserSettingsPage>
      <Button color="secondary" variant="outlined" onClick={goHome}>
        Return
      </Button>
      <Form onSubmit={updateDetails}>
        <H3>Update Details</H3>
        <TextField
          label="Username"
          type="text"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <TextField
          label="Height (cm)"
          type="text"
          onChange={e => setHeight(e.target.value)}
          value={height}
        />
        <TextField
          label="Weight (Kg)"
          type="text"
          onChange={e => setWeight(e.target.value)}
          value={weight}
        />
        <TextField
          label="Target Calories (Kcal)"
          type="text"
          onChange={e => setTargetCalories(e.target.value)}
          value={targetCalories}
        />
        <Button type="submit" color="secondary" variant="outlined">
          Update Details
        </Button>
      </Form>
      <AppNav />
    </UserSettingsPage>
  );
}
