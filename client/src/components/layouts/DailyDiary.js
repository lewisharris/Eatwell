import Entry from "./Entry";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TableBody } from "@material-ui/core/";
import Table from "./Table";
import H2 from "../reusablecomponents/H2";
import P from "../reusablecomponents/P";

// styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px auto 0px auto;
  max-width: 1000px;
`;

//component
export default function DailyDiary(props) {
  const dataList = props.data;
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    sortList();
    sortList();
  }, [dataList]);

  // calculate total calories
  const renderTotal = list => {
    console.log(list);
    if (list.length === 0) {
      return "0";
    } else {
      list
        .map(entry => {
          return entry.calories;
        })
        .reduce((a, b) => {
          return a + b;
        });
    }
  };

  // organise seperate lists for each meal type
  const sortList = () => {
    const data = dataList;
    if (dataList === []) {
      return;
    }
    const breakfastList = data.filter(entry => {
      return entry.mealType === "breakfast";
    });
    setBreakfast(breakfastList);

    const lunchList = data.filter(entry => {
      return entry.mealType === "lunch";
    });
    setLunch(lunchList);
    const dinnerList = data.filter(entry => {
      return entry.mealType === "dinner";
    });
    setLunch(dinnerList);
    const snacksList = data.filter(entry => {
      return entry.mealType === "snack";
    });
    setSnacks(snacksList);
  };

  return (
    <Container>
      {breakfast.length === 0 ? (
        <div>no entries</div>
      ) : (
        breakfast.map(entry => (
          <Entry key={entry._id} data={entry} delete={props.delete} />
        ))
      )}
      <H2>Breakfast</H2>
      <Table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th></th>
            <th>Remove</th>
          </tr>
        </thead>
        <TableBody>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "breakfast";
                })
                .map(entry => {
                  return (
                    <Entry key={entry._id} data={entry} delete={props.delete} />
                  );
                })
            : null}
        </TableBody>
      </Table>
      <P large>Total:</P>

      <H2>Lunch</H2>
      <Table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th></th>
            <th>Remove</th>
          </tr>
        </thead>
        <TableBody>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "lunch";
                })
                .map(entry => {
                  return (
                    <Entry key={entry._id} data={entry} delete={props.delete} />
                  );
                })
            : null}
        </TableBody>
      </Table>
      <P large>Total:</P>

      <H2>Dinner</H2>
      <Table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th></th>
            <th>Remove</th>
          </tr>
        </thead>
        <TableBody>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "dinner";
                })
                .map(entry => {
                  return (
                    <Entry key={entry._id} data={entry} delete={props.delete} />
                  );
                })
            : null}
        </TableBody>
      </Table>
      <P large>Total:</P>

      <H2>Snacks</H2>
      <Table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th></th>
            <th>Remove</th>
          </tr>
        </thead>
        <TableBody>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "snack";
                })
                .map(entry => {
                  return (
                    <Entry key={entry._id} data={entry} delete={props.delete} />
                  );
                })
            : null}
        </TableBody>
      </Table>
      <P large>Total:</P>
    </Container>
  );
}
