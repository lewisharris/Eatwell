import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "../auth/AuthButtons";

export default function Header() {
  return (
    <>
      <Link to="/">
        <h1>Calorie Counter</h1>
        <AuthButtons />
      </Link>
    </>
  );
}
