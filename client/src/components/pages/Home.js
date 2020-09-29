import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import RecordFood from "../foodhandling/RecordFood";
import DailyDiary from "../layouts/DailyDiary";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

  return (
    <div>
      Welcome
      <RecordFood />
      <DailyDiary />
    </div>
  );
}
