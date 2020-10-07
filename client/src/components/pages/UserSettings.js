import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import UserContext from "../../context/userContext";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
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

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
  });
  return (
    <UserSettingsPage>
      <Form>
        <H3>Update Details</H3>
        <TextField label="Username" type="text" />
        <TextField label="Height (cm)" type="text" />
        <TextField label="Weight (Kg)" type="text" />
        <TextField label="Target Calories (Kcal)" type="text" />
        <Button type="submit" color="secondary" variant="outlined">
          Update Details
        </Button>
      </Form>
      <AppNav />
    </UserSettingsPage>
  );
}
