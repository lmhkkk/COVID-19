import React, { Component } from "react";
import "./Cases.css";

class Cases extends Component {

  onHandleChartMap=(e)=>{
    this.props.onHandleDisplay(e.target.value);
  }
  render() {
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = this.props.globalStatus;
    return (
      <div className="cases-display">
        <button className="total-cases" value="confirmed" onClick={this.onHandleChartMap}>
          Total Cases <br/>
          <>{TotalConfirmed}</>
        </button>
        <button className="recovered-cases" value="recovered" onClick={this.onHandleChartMap}>
          Recovered Cases <br/>
          {TotalRecovered}
        </button>
        <button className="death-cases" value="death" onClick={this.onHandleChartMap}>
          Death Cases <br/>
          {TotalDeaths}
        </button>
      </div>
    );
  }
}

export default Cases;
