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
        <table>
          <tbody>
            <td>Food</td>
            <td>Calories</td>
            <td>Remove</td>
          </tbody>
        </table>

        <h4>Breakfast</h4>
        {this.state.breakfast}
        {dataList
          ? dataList
              .filter(entry => {
                return entry.mealType === "breakfast";
              })
              .map(entry => {
                return (
                  <Table
                    key={entry._id}
                    data={entry}
                    delete={this.props.delete}
                  />
                );
              })
          : null}
        <p>Total: </p>
        <h4>Lunch</h4>
        {dataList
          ? dataList
              .filter(entry => {
                return entry.mealType === "lunch";
              })
              .map(entry => {
                return (
                  <Table
                    key={entry._id}
                    data={entry}
                    delete={this.props.delete}
                  />
                );
              })
          : null}
        <p>Total: </p>
        <h4>Dinner</h4>
        {dataList
          ? dataList
              .filter(entry => {
                return entry.mealType === "dinner";
              })
              .map(entry => {
                return (
                  <Table
                    key={entry._id}
                    data={entry}
                    delete={this.props.delete}
                  />
                );
              })
          : null}
        <p>Total: </p>
        <h4>Snacks</h4>

        {dataList
          ? dataList
              .filter(entry => {
                return entry.mealType === "snack";
              })
              .map(entry => {
                return (
                  <Table
                    key={entry._id}
                    data={entry}
                    delete={this.props.delete}
                  />
                );
              })
          : null}
        <p>Total: </p>
      </div>
    );
  }
}
