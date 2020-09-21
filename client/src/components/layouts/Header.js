import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "../auth/AuthButtons";

export default function Header() {
  return (
    <div>
      <Link to="/">
        <h1>ToDoApp</h1>
        <AuthButtons />
      </Link>
    </div>
  );
}
