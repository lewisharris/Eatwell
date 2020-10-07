import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import UserContext from "../../context/userContext";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import Input from "../reusablecomponents/Input";
import AppNav from "../layouts/AppNav";
import axios from "axios";

//styling
const UserStatsPage = styled.div`
  background: ${props => props.theme.primary};
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
`;

//component
export default function SearchFood(props) {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
  });

  const submitForm = e => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <UserStatsPage>
      <Form
        onSubmit={e => {
          submitForm(e);
        }}
      >
        <H3>Look up food</H3>
        <Input label="Search" type="text" />
        <div> some kind of drop down menu</div>
        <Input label="Weight (g)" type="text" />
        <div>display calories here</div>
        <Button type="submit" color="secondary" variant="outlined">
          Add Food
        </Button>
      </Form>
      <AppNav />
    </UserStatsPage>
  );
}
