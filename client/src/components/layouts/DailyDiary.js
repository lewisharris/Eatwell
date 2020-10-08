import Entry from "./Entry";
import React, { Component } from "react";
import styled from "styled-components";
import {
  TableBody,
  TableContainer,
  Paper,
  Typography
} from "@material-ui/core/";
import Table from "./Table";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px auto 0px auto;
  max-width: 1000px;
`;

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

  renderTotal = list => {
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

  sortList = (data, filterVal) => {
    const list = data.filter(entry => {
      return entry.mealType === filterVal;
    });
  };

  renderList = () => {};

  componentDidMount() {
    const { data } = this.props;
    this.setState({ dataList: data });
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ dataList: data });
    }
    this.sortList(this.state.dataList, "breakfast");
  }

  render() {
    const { dataList } = this.state;

    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Calories</th>
              <th></th>
              <th>Remove</th>
            </tr>
          </thead>
        </Table>

        <Typography variant="h6">Breakfast</Typography>
        <Table>
          <TableBody>
            {dataList
              ? dataList
                  .filter(entry => {
                    return entry.mealType === "breakfast";
                  })
                  .map(entry => {
                    return (
                      <Entry
                        key={entry._id}
                        data={entry}
                        delete={this.props.delete}
                      />
                    );
                  })
              : null}
          </TableBody>
        </Table>
        <p>Total:</p>

        <Typography variant="h6">Lunch</Typography>
        <Table>
          <TableBody>
            {dataList
              ? dataList
                  .filter(entry => {
                    return entry.mealType === "lunch";
                  })
                  .map(entry => {
                    return (
                      <Entry
                        key={entry._id}
                        data={entry}
                        delete={this.props.delete}
                      />
                    );
                  })
              : null}
          </TableBody>
        </Table>
        <p>Total: </p>

        <Typography variant="h6">Dinner</Typography>
        <Table>
          <TableBody>
            {dataList
              ? dataList
                  .filter(entry => {
                    return entry.mealType === "dinner";
                  })
                  .map(entry => {
                    return (
                      <Entry
                        key={entry._id}
                        data={entry}
                        delete={this.props.delete}
                      />
                    );
                  })
              : null}
          </TableBody>
        </Table>
        <p>Total: </p>

        <Typography variant="h6">Snacks</Typography>
        <Table>
          <TableBody>
            {dataList
              ? dataList
                  .filter(entry => {
                    return entry.mealType === "snack";
                  })
                  .map(entry => {
                    return (
                      <Entry
                        key={entry._id}
                        data={entry}
                        delete={this.props.delete}
                      />
                    );
                  })
              : null}
          </TableBody>
        </Table>
        <p>Total: </p>
      </Container>
    );
  }
}
