import React, { Component } from "react";
import "./Cases.css";

class Cases extends Component {

  onHandleChartMap=(e)=>{
    this.props.onHandleDisplay(e.target.value);
  }
  render() {
    const{isCountryStatus,summaryOfCountries,globalStatus,countryDisplay} = this.props;
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStatus;

    return (
      <div className="cases-display">
        <button className="total-cases" value="confirmed" onClick={this.onHandleChartMap}>
          Total Cases <br/>
          <>{!isCountryStatus?TotalConfirmed:summaryOfCountries.map((item)=>{

            return item.Country.toLowerCase()===countryDisplay?item.TotalConfirmed:null
          })}</>
        </button>
        <button className="recovered-cases" value="recovered" onClick={this.onHandleChartMap}>
          Recovered Cases <br/>
          {!isCountryStatus?TotalRecovered:summaryOfCountries.map((item)=>{

            return item.Country.toLowerCase()===countryDisplay?item.TotalRecovered:null
          })}
        </button>
        <button className="death-cases" value="death" onClick={this.onHandleChartMap}>
          Death Cases <br/>
          {!isCountryStatus?TotalDeaths:summaryOfCountries.map((item)=>{

            return item.Country.toLowerCase()===countryDisplay?item.TotalDeaths:null
          })}
        </button>
      </div>
    );
  }
}

export default Cases;
