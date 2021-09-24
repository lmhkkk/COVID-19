import React, { Component } from "react";
import Chart from "../Components/Chart";
import List from "../Components/List";
import Cases from "../Components/Cases";
import "./Home.css";
import NavBar from "../Layouts/Navbar";
import covidAPI from "../Services/covidAPI";
import Map from "../Components/Map";

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
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });
      const response = await covidAPI.summary();
      const responseOfWorldMap = await covidAPI.fetchMapDataWorld();
      const responsestatusOverWorld = await covidAPI.statusOverWorld();
      this.setState({
        summaryOfCountries: response.data.Countries,
        globalStatus: response.data.Global,
        worldMap: responseOfWorldMap.data,
        statusOverWorld: responsestatusOverWorld.data,
        isLoading: false,
      });
    } catch (err) {
      alert(err);
    }
  }
  onHandleDisplay = (value) => {
    this.setState({

      isLoading: true,
    });
      setTimeout(() => {
        this.setState({
          isLoading: false,
          display: value,
        })
      }, 1000);

      return;
  };
  render() {
    const {
      globalStatus,
      summaryOfCountries,
      worldMap,
      statusOverWorld,
      display,
      isLoading,
    } = this.state;
    return (
      <div>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-grow text-primary" role="status"></div>
            <div className="spinner-grow text-secondary" role="status"></div>
            <div className="spinner-grow text-success" role="status"></div>
            <div className="spinner-grow text-danger" role="status"></div>
            <div className="spinner-grow text-warning" role="status"></div>
            <div className="spinner-grow text-info" role="status"></div>
            <div className="spinner-grow text-light" role="status"></div>
            <div className="spinner-grow text-dark" role="status"></div>
          </div>
        ) : (
          <>
            <NavBar />
            <div className="app-display">
              <div className="app-status">
                <Cases
                  globalStatus={globalStatus}
                  onHandleDisplay={this.onHandleDisplay}
                />
                <Chart statusOverWorld={statusOverWorld} display={display} />
                <Map
                  worldMap={worldMap}
                  summaryOfCountries={summaryOfCountries}
                  display={display}
                />
              </div>
              <div className="app-livecase">
                <List
                  summaryOfCountries={summaryOfCountries}
                  onHandleDisplay={this.onHandleDisplay}
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
