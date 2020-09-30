import Table from "./Table";
import React, { Component } from "react";

export default class DailyDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    };
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState({ dataList: data });
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ dataList: data });
    }
  }

  render() {
    const { dataList } = this.state;
    return (
      <div>
        <h4>Breakfast</h4>
        {this.state.breakfast}
        <ul>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "breakfast";
                })
                .map(entry => {
                  return (
                    <li key={entry._id}>
                      {" "}
                      {entry.title} {entry.calories}Kcal
                    </li>
                  );
                })
            : null}
        </ul>
        <h4>Lunch</h4>
        <ul>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "lunch";
                })
                .map(entry => {
                  return (
                    <li key={entry._id}>
                      {" "}
                      {entry.title} {entry.calories}Kcal
                    </li>
                  );
                })
            : null}
        </ul>
        <h4>Dinner</h4>
        <ul>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "dinner";
                })
                .map(entry => {
                  return (
                    <li key={entry._id}>
                      {" "}
                      {entry.title} {entry.calories}Kcal
                    </li>
                  );
                })
            : null}
        </ul>
        <h4>Snacks</h4>
        <ul>
          {dataList
            ? dataList
                .filter(entry => {
                  return entry.mealType === "snack";
                })
                .map(entry => {
                  return (
                    <li key={entry._id}>
                      {" "}
                      {entry.title} {entry.calories}Kcal
                    </li>
                  );
                })
            : null}
        </ul>
      </div>
    );
  }
}
