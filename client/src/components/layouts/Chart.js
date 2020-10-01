import React from "react";
import { TableCell, TableRow } from "@material-ui/core/";

export default function Chart(props) {
  const { title, calories } = props.data;

  return (
    <TableRow>
      <TableCell align="right">{title}</TableCell>
      <TableCell align="right">{calories} Kcal</TableCell>
      <TableCell align="right">
        <button onClick={() => props.delete(props.data._id)}>X</button>
      </TableCell>
    </TableRow>
  );
}
