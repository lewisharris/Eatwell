import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import RecordFood from "../foodhandling/RecordFood";

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
      <table>
        <tbody>
          <tr>
            <th>Food/Meal</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Remove</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
