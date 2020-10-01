import React from "react";

export default function Table(props) {
  const { title, calories } = props.data;

  return (
    <table>
      <tbody>
        <td>{title}</td>
        <td>{calories} Kcal</td>
        <td>
          <button onClick={() => props.delete(props.data._id)}>X</button>
        </td>
      </tbody>
    </table>
  );
}
