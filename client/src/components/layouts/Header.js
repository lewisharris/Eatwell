import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "../auth/AuthButtons";
import { Typography } from "@material-ui/core";

export default function Header() {
  return (
    <>
      <Link to="/">
        <Typography color="primary" variant="h1"></Typography>
        <AuthButtons />
      </Link>
    </>
  );
}
