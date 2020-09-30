import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import RecordFood from "../foodhandling/RecordFood";
import DailyDiary from "../layouts/DailyDiary";

export default function Home() {
  const { userData } = useContext(UserContext);
  const [name, setName] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
      return;
    }
    async function getUsername() {
      let name = await userData.user.username;
      await setName(name);
    }
    getUsername();
  }, [userData]);

  return (
    <div>
      Welcome {name}
      <RecordFood />
      <DailyDiary />
    </div>
  );
}
