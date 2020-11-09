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
  }, [dataList]);

  // calculate total calories
  const renderTotal = list => {
    let total = 0;
    if (list.length === 0) {
      total = 0;
    } else {
      total = `${list
        .map(entry => {
          return parseInt(entry.calories);
        })
        .reduce((a, b) => {
          return a + b;
        })} Kcal`;
    }
    return total;
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
    setDinner(dinnerList);

    const snacksList = data.filter(entry => {
      return entry.mealType === "snack";
    });
    setSnacks(snacksList);
  };

  return (
    <Container>
      <H2>Breakfast</H2>
      {breakfast.length === 0 ? (
        <P italic indent>
          no entries
        </P>
      ) : (
        <>
          <Table>
            <tbody>
              {breakfast.map(entry => (
                <Entry key={entry._id} data={entry} delete={props.delete} />
              ))}
            </tbody>
          </Table>
          <P large>Total: {renderTotal(breakfast)}</P>
        </>
      )}

      <H2>Lunch</H2>

      {lunch.length === 0 ? (
        <P italic indent>
          no entries
        </P>
      ) : (
        <>
          <Table>
            <tbody>
              {lunch.map(entry => (
                <Entry key={entry._id} data={entry} delete={props.delete} />
              ))}
            </tbody>
          </Table>
          <P large>Total: {renderTotal(lunch)}</P>
        </>
      )}

      <H2>Dinner</H2>

      {dinner.length === 0 ? (
        <P italic indent>
          no entries
        </P>
      ) : (
        <>
          <Table>
            <tbody>
              {dinner.map(entry => (
                <Entry key={entry._id} data={entry} delete={props.delete} />
              ))}
            </tbody>
          </Table>
          <P large>Total: {renderTotal(dinner)}</P>
        </>
      )}

      <H2>Snacks</H2>
      {snacks.length === 0 ? (
        <P italic indent>
          no entries
        </P>
      ) : (
        <>
          <Table>
            <tbody>
              {snacks.map(entry => (
                <Entry key={entry._id} data={entry} delete={props.delete} />
              ))}
            </tbody>
          </Table>
          <P large>Total: {renderTotal(snacks)}</P>
        </>
      )}
    </Container>
  );
}
