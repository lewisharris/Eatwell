import React from "react";
import Entry from "./Entry";
import styled from "styled-components";

const Table = styled.table`
  max-width: 100%;
  border: 3px solid ${props => props.theme.primary};
  border-radius: 10px;
  margin: 0px 10px;
`;

export default Table;
