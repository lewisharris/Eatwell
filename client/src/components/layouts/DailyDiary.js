import Chart from "./Chart";
import React, { Component } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@material-ui/core/";

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
      <Container>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              <TableRow>
                <TableCell align="right">Food</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6">Breakfast</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {this.state.breakfast}
              {dataList
                ? dataList
                    .filter(entry => {
                      return entry.mealType === "breakfast";
                    })
                    .map(entry => {
                      return (
                        <Chart
                          key={entry._id}
                          data={entry}
                          delete={this.props.delete}
                        />
                      );
                    })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <p>Total: </p>

        <Typography variant="h6">Lunch</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {dataList
                ? dataList
                    .filter(entry => {
                      return entry.mealType === "lunch";
                    })
                    .map(entry => {
                      return (
                        <Chart
                          key={entry._id}
                          data={entry}
                          delete={this.props.delete}
                        />
                      );
                    })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <p>Total: </p>

        <Typography variant="h6">Dinner</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {dataList
                ? dataList
                    .filter(entry => {
                      return entry.mealType === "dinner";
                    })
                    .map(entry => {
                      return (
                        <Chart
                          key={entry._id}
                          data={entry}
                          delete={this.props.delete}
                        />
                      );
                    })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <p>Total: </p>
        <Typography variant="h6">Snacks</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {dataList
                ? dataList
                    .filter(entry => {
                      return entry.mealType === "snack";
                    })
                    .map(entry => {
                      return (
                        <Chart
                          key={entry._id}
                          data={entry}
                          delete={this.props.delete}
                        />
                      );
                    })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <p>Total: </p>
      </Container>
    );
  }
}
