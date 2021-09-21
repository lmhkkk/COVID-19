import React, { Component } from "react";
import "./List.css";

class List extends Component {
  render() {
    const { summaryOfCountries, globalStatus } = this.props;
    return (
      <>
        <p className=" fw-bold text-danger text-center fs-4">
          LIVE CASES BY COUNTRY
        </p>
        <div className="table-display">
          <table className="table table-borderless table-striped table-hover">
            <thead>
              <tr>
                <th>National</th>
                <th scope="col">
                <select
                    className="form-select"
                  >
                    <option >TotalConfirmed</option>
                    <option >TotalDeaths</option>
                    <option >TotalRecovered</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {summaryOfCountries.map((item) => {
                const { Country, TotalConfirmed } = item;
                return (
                  <tr>
                    <td>{Country}</td>
                    <td>{TotalConfirmed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default List;
