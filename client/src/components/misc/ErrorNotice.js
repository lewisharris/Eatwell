import React from "react";
import { Typography } from "@material-ui/core";

//fix bug, component must show nothing when error is cleared
export default function ErrorNotice(props) {
  return (
    <Typography variant="body2" color="error">
      <button onClick={props.clearError}>
        <span>{props.message}</span>
      </button>
    </Typography>
  );
}
