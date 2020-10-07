import React from "react";
import { TableCell, TableRow } from "@material-ui/core/";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";

const Cancel = styled.button`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.error};
  border-radius: 30px;
  color: ${props => props.theme.textPrimary};
  padding: 0px;
`;

export default function Entry(props) {
  const { title, calories } = props.data;

  return (
    <TableRow>
      <TableCell align="right">{title}</TableCell>
      <TableCell align="right">{calories} Kcal</TableCell>
      <TableCell align="right">
        <Cancel onClick={() => props.delete(props.data._id)}>
          <ClearIcon fontSize="small" />
        </Cancel>
      </TableCell>
    </TableRow>
  );
}
