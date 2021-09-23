import React from "react";
import "./Cases.css";

const Cases = (props) => {
  const{TotalConfirmed,TotalDeaths,TotalRecovered}=props.globalStatus;
  return (
    <div className="cases-display">
      <div className="total-cases">
        <p>Total Cases</p>
        <p>{TotalConfirmed}</p>
      </div>
      <div className="recovered-cases">
        <p>Recovered Cases</p>
        <p>{TotalRecovered}</p>
      </div>
      <div className="death-cases">
        <p>Death Cases</p>
        <p>{TotalDeaths}</p>
      </div>
    </div>
  );
};

export default Cases;
