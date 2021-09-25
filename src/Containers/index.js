import React, { Component } from "react";
import Chart from "../Components/Chart";
import List from "../Components/List";
import Cases from "../Components/Cases";
import "./Home.css";
import NavBar from "../Layouts/Navbar";
import covidAPI from "../Services/covidAPI";
import WorldMap from "../Components/Map";
import CountryMap from "../Components/Map/countryMap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryOfCountries: [],
      globalStatus: {},
      worldMap: {},
      statusOverWorld: [],
      display: "confirmed",
      isLoading: false,
      isCountryStatus: false,
      countryDisplay: "world",
      summaryOfCountry: [],
      countryMap: {},
    };
  }
  componentDidMount() {
    !this.state.isCountryStatus && this.onfetch();
  }
  
  onfetch = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const responseSummary = await covidAPI.summary();
      const responseGlobalStatus = await covidAPI.summary();
      const responseOfWorldMap = await covidAPI.fetchMapDataWorld();
      const responsestatusOverWorld = await covidAPI.statusOverWorld();
      this.setState({
        summaryOfCountries: responseSummary.data.Countries,
        globalStatus: responseGlobalStatus.data.Global,
        worldMap: responseOfWorldMap.data,
        statusOverWorld: responsestatusOverWorld.data,
        isLoading: false,
        isCountryStatus: false,
        countryDisplay: "world",
        countryMap: {},
      });
    } catch (err) {
      alert(err);
    }
  };

  onHandleDisplayWorldOrCountry = async (value) => {
      try {
        const responeStatusOfCountry = await covidAPI.statusByCountry(value);
        this.setState({
          summaryOfCountry: responeStatusOfCountry.data,
          isCountryStatus: true,
          countryDisplay: value,
        });
        const countryCode =
          responeStatusOfCountry.data[0].CountryCode.toLowerCase();
        const responsestatusOfCountry = await covidAPI.fetchMapDataByCountry(
          countryCode
        );
        this.setState({
          countryMap: responsestatusOfCountry.data,
        });
      } catch (err) {
        alert(err);
      }
  };
  onHandleDisplay = (value) => {
    this.setState({
      isLoading: true,
      display: value,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  };
  render() {
    const {
      globalStatus,
      summaryOfCountries,
      worldMap,
      statusOverWorld,
      display,
      isLoading,
      countryDisplay,
      isCountryStatus,
      summaryOfCountry,
      countryMap,
    } = this.state;
    return (
      <div>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-grow text-primary mx-2" role="status"></div>
            <div
              className="spinner-grow text-secondary mx-2"
              role="status"
            ></div>
            <div className="spinner-grow text-success mx-2" role="status"></div>
            <div className="spinner-grow text-danger " role="status"></div>
            <div className="spinner-grow text-warning mx-2" role="status"></div>
            <div className="spinner-grow text-info mx-2" role="status"></div>
            <div className="spinner-grow text-dark mx-2" role="status"></div>
          </div>
        ) : (
          <>
            <NavBar />
            <div className="app-display">
              <div className="app-status">
                <Cases
                  globalStatus={globalStatus}
                  onHandleDisplay={this.onHandleDisplay}
                  summaryOfCountries={summaryOfCountries}
                  isCountryStatus={isCountryStatus}
                  countryDisplay={countryDisplay}
                />
                <Chart
                  statusOverWorld={statusOverWorld}
                  display={display}
                  isCountryStatus={isCountryStatus}
                  summaryOfCountry={summaryOfCountry}
                />
                {!isCountryStatus ? (
                  <WorldMap
                    worldMap={worldMap}
                    summaryOfCountries={summaryOfCountries}
                    display={display}
                  />
                ) : (
                  <CountryMap countryMap={countryMap}
                  summaryOfCountry={summaryOfCountry} />
                )}
              </div>
              <div className="app-livecase">
                <List
                  summaryOfCountries={summaryOfCountries}
                  onHandleDisplay={this.onHandleDisplay}
                  display={display}
                  onHandleDisplayWorldOrCountry={
                    this.onHandleDisplayWorldOrCountry
                  }
                  countryDisplay={countryDisplay}
                  onfetch={this.onfetch}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Home;
