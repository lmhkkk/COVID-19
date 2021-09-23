import React, { Component } from "react";
import Chart from "../Components/Chart";
import List from "../Components/List";
import Cases from "../Components/Cases";
import "./Home.css"
import NavBar from "../Layouts/Navbar";
import covidAPI from "../Services/covidAPI";
import Map from "../Components/Map";

class Home extends Component {
  constructor(props){
    super(props);
    this.state ={
      summaryOfCountries:[],
      globalStatus:{},
      worldMap:{},
    };
  }

  async componentDidMount(){
    try{
      const response = await covidAPI.summary();
      const responseOfWorldMap = await covidAPI.fetchMapDataWorld();
      console.log(response)
      this.setState({
        summaryOfCountries: response.data.Countries,
        globalStatus: response.data.Global,
        worldMap: responseOfWorldMap.data,
      })
    }catch(err){
      console.log(err);
    }
  }

  render() {
    const {globalStatus,summaryOfCountries,worldMap} = this.state;
    return (
      <div>
        <NavBar />
        <div className="app-display">
          <div className="app-status">
           <Cases globalStatus={globalStatus}/>
            <Chart />
            <Map worldMap={worldMap} summaryOfCountries={summaryOfCountries}/>
          </div>
          <div className="app-livecase">
            <List summaryOfCountries={summaryOfCountries}
            globalStatus={globalStatus}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
