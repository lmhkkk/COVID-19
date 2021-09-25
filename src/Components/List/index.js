import React, { Component } from "react";
import "./List.css";

class List extends Component {
  state = {
    sortTypeStatus: "",
    sortTypeCountry: "",
  };
  onChangeSortType = (e) => {
    e.preventDefault(); 
    this.props.onHandleDisplay(e.target.value);
    this.setState({
      sortTypeStatus: e.target.value,
    });
  };
  onChangCountry = (e)=>{
    e.preventDefault();
    if(e.target.value!=="world"){
      this.props.onHandleDisplayWorldOrCountry(e.target.value);
      this.setState({
        sortTypeCountry: e.target.value,
      });
    }else{
      this.props.onfetch();
    }

  }
  componentDidMount(){
    this.setState({
      sortTypeStatus:this.props.display,
      sortTypeCountry: this.props.countryDisplay,
      countryId:this.props.countryCode,
    })
  }
  render() { 
    const { summaryOfCountries } = this.props;
    const { sortTypeStatus,sortTypeCountry } = this.state;

    return (
      <>
        <p className=" fw-bold text-danger text-center fs-4">
          LIVE CASES BY COUNTRY
        </p>
        <div className="table-title">
          <select className="p-2 form-select" 
          style={{width:"18rem"}} 
          onChange={this.onChangCountry}
          value={sortTypeCountry}
          >
            <option value="world" >World</option>
            {summaryOfCountries.map((item, index) => {
              const { Country } = item;
              return <option key={index} value={`${Country.toLowerCase()}`}>{Country}</option>;
            })}
          </select>
          <select
            className="form-select"
            name="sortType"
            value={sortTypeStatus}
            onChange={this.onChangeSortType}
          >
            <option value="confirmed">TotalConfirmed</option>
            <option value="death">TotalDeaths</option>
            <option value="recovered">TotalRecovered</option>
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
              {summaryOfCountries.map((item, index) => {
                const { Country, TotalConfirmed, TotalDeaths, TotalRecovered } =
                  item;
                switch (sortTypeStatus) {
                  case "death":
                    return (
                      <tr key={index}>
                        <td>{Country}</td>
                        <td className="px-4">{TotalDeaths}</td>
                      </tr>
                    );
                  case "recovered":
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
