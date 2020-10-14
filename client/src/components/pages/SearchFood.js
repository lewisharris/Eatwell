import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from "../reusablecomponents/Button";
import UserContext from "../../context/userContext";
import Form from "../reusablecomponents/Form";
import H3 from "../reusablecomponents/H3";
import P from "../reusablecomponents/P";
import Input from "../reusablecomponents/Input";
import AppNav from "../layouts/AppNav";
import axios from "axios";

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
    <>
      <Form
        onSubmit={e => {
          submitForm(e);
        }}
      >
        <H3>Look up food</H3>
        <Input label="Search" type="text" />
        <P> some kind of drop down menu</P>
        <Input label="Weight (g)" type="text" />
        <P>display calories here</P>
        <Button type="submit" onClick={e => submitForm(e)} text="Add Food">
          Add Food
        </Button>
      </Form>
      <AppNav />
    </>
  );
}
