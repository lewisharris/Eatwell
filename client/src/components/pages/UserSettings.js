import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import { Button } from "@material-ui/core";

export default function UserSettings() {
  const { userData } = useContext(UserContext);
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

  const history = useHistory();

  return (
    <div>
      <Button color="primary" variant="outlined" onClick={goHome}>
        Return
      </Button>
      <form>
        <label>username</label>
        <input type="text"></input>
        <label>Height</label>
        <input type="text"></input>
        <label>Weight</label>
        <input type="text"></input>
        <label>Calorie Target</label>
        <input type="text"></input>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
