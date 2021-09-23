import React, { Component } from "react";
import "./List.css";

const CONFIRMED = 0;
const DEATH = 1;
const RECOVERED = 2;
class List extends Component {
  state = {
    sortType: CONFIRMED,
  };
  onChangeSortType = (e) => {
    e.preventDefault();
    this.setState({
      sortType: +e.target.value,
    });
  };
  render() {
    const { summaryOfCountries, globalStatus } = this.props;
    const { sortType } = this.state;
    return (
      <>
        <p className=" fw-bold text-danger text-center fs-4">
          LIVE CASES BY COUNTRY
        </p>
        <div className="table-title">
          <span className="p-2">World</span>
          <select
            className="form-select"
            name="sortType"
            value={this.state.sortType}
            onChange={this.onChangeSortType}
          >
            <option value={CONFIRMED}>TotalConfirmed</option>
            <option value={DEATH}>TotalDeaths</option>
            <option value={RECOVERED}>TotalRecovered</option>
          </select>
        </div>
        <div className="table-display">
          <table className="table table-borderless table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfCountries.map((item,index) => {
                const { Country, TotalConfirmed, TotalDeaths, TotalRecovered } =
                  item;
                switch (sortType) {
                  case DEATH:
                    return (
                      <tr key={index}>
                        <td>{Country}</td>
                        <td className="px-4">{TotalDeaths}</td>
                      </tr>
                    );
                  case RECOVERED:
                    return (
                      <tr key={index}>
                        <td>{Country}</td>
                        <td className="px-5">{TotalRecovered}</td>
                      </tr>
                    );
                  default:
                    return (
                      <tr key={index}>
                        <td>{Country}</td>
                        <td className="px-4">{TotalConfirmed}</td>
                      </tr>
                    );
                }
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default List;
