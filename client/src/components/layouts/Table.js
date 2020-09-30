import React, { useState } from "react";

export default function Table(props) {
  function renderList() {
    if (props.list === undefined) {
      return;
    } else {
      props.list.map(entry => {
        return (
          <tbody>
            <td>{props.title}</td>
            <td>{props.calories}</td>
            <td>X</td>
          </tbody>
        );
      });
    }
  }
  return (
    <table>
      <thead>
        <td>Food {props.name}</td>
        <td>Calories</td>
        <td>Remove</td>
      </thead>
      {renderList()}
    </table>
  );
}
