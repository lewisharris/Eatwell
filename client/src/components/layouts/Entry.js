import React, { useState, useContext } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../context/userContext";

const Tr = styled.tr`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
`;

const Td = styled.td`
  color: ${props => props.theme.textPrimary};
  text-align: ${props => (props.leftAlign ? "left" : "right")};
  width: 25%;
`;

const Cancel = styled.button`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.error};
  border-radius: 30px;
  color: ${props => props.theme.textPrimary};
  padding: 0px;
`;

export default function Entry(props) {
  const { userData } = useContext(UserContext);
  const { title, calories, mealType, _id } = props.data;
  const [editTitle, setEditTitle] = useState(title);
  const [editCalories, setEditCalories] = useState(calories);
  const [edit, setEdit] = useState(false);

  const toggleEdit = e => {
    e.preventDefault();
    setEdit(!edit);
    if (edit) {
      console.log("sent data");
      const data = {
        title: editTitle,
        calories: editCalories,
        mealType: mealType
      };
      axios
        .put(`http://localhost:5000/list/update/${_id}`, data, {
          headers: { "x-auth-token": userData.token }
        })
        .then(res => console.log("updated!"))
        .catch(err => console.log(err));
    } else {
      console.log("edit data");
    }
  };

  return (
    <Tr>
      {edit ? (
        <Td leftAlign>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <input
            type="text"
            value={editCalories}
            onChange={e => setEditCalories(e.target.value)}
          />
          <button onClick={e => toggleEdit(e)}> Confirm</button>
        </Td>
      ) : (
        <>
          <Td leftAlign>{editTitle}</Td>
          <Td>{editCalories} Kcal</Td>
          <Td>
            <button onClick={e => toggleEdit(e)}> Edit</button>
          </Td>
        </>
      )}

      <Td>
        <Cancel onClick={() => props.delete(props.data._id)}>
          <ClearIcon fontSize="small" />
        </Cancel>
      </Td>
    </Tr>
  );
}

//if edit is false display edit icon and have item read only
// if edit is true, display edit as confirm/update and have items as fields
// on confirm, send edited data to server and turn edit to false
