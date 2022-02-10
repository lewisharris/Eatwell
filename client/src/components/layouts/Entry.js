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
  position: relative;
  align-items: center;
  border-radius: 5px;
  margin: 4px auto;
  background: ${props => props.theme.card};
  -webkit-box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
`;

const Td = styled.td`
  color: ${props => {
    if (!props.kCal) {
      return props.theme.textPrimary;
    } else {
      return props.theme.secondary;
    }
  }};
  font-size: ${props => {
    if (!props.kCal) {
      return "16px";
    } else {
      return "12px";
    }
  }};
  text-align: ${props => (props.leftAlign ? "left" : "right")};
  min-width: 25%;
  min-height: 20px;
`;

const Input = styled.input`
  border: 1px solid gray;
  display: inline-block;
  background: none;
  color: gray;
  text-align: center;
  margin: 0px 5px;
  padding: 0px 5px;
  max-width: 70px;
  height: 100%;
  font-size: 16px;
  transition: all 0.3s 0s ease-in-out;
  border-radius: 5px;
  :focus {
    color: white;
    border: 1px solid ${props => props.theme.primary};
    -webkit-box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
    -moz-box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
    box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
    outline: none;
    transition: all 0.3s 0s ease-in-out;
  }
`;

const Button = styled.button`
  background: ${props => (props.edit === false ? "#eda509" : "#06d63e")};
  color: black;
  font-weight: 700;
  border: none;
  padding: 5px;
  border-radius: 3px;
  display: inline-block;
  width: 70px;
  margin-left: 10px;
`;

const EditContainer = styled.div`
  padding: 0px 5px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Cancel = styled.button`
  width: 30px;
  height: 30px;
  background: ${props => (props.edit === true ? "gray" : props.theme.error)};
  border-radius: 30px;
  color: ${props => props.theme.textPrimary};
  padding: 0px;
  margin: 0px auto;
  pointer-events: ${props => (props.edit == true ? "none" : "auto")};
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
          <EditContainer>
            <Input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
            <Input
              type="text"
              value={editCalories}
              onChange={e => setEditCalories(e.target.value)}
            />
            <Button onClick={e => toggleEdit(e)}> Confirm</Button>
          </EditContainer>
        </Td>
      ) : (
        <>
          <Td leftAlign>{editTitle}</Td>
          <Td kCal>{editCalories} Kcal</Td>
          <Td>
            <Button onClick={e => toggleEdit(e)} edit={edit}>
              {" "}
              Edit
            </Button>
          </Td>{" "}
          <Td>
            <Cancel onClick={() => props.delete(props.data._id)} edit={edit}>
              <ClearIcon fontSize="small" />
            </Cancel>
          </Td>
        </>
      )}
    </Tr>
  );
}

//if edit is false display edit icon and have item read only
// if edit is true, display edit as confirm/update and have items as fields
// on confirm, send edited data to server and turn edit to false
