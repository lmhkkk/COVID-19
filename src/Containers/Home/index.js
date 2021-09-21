import React, { Component } from "react";
import Chart from "../Chart";
import Map from "../Map";
import List from "../List";
import Cases from "../Cases";
import "./Home.css"
import NavBar from "../../Layouts/Navbar";
import CountryAPI from "../../Services/countries";

class Home extends Component {
  constructor(props){
    super(props);
    this.state ={
      summaryOfCountries:[],
      globalStatus:{},
    };
  }

  async componentDidMount(){
    try{
      const response = await CountryAPI.summary();
      console.log(response)
      this.setState({
        summaryOfCountries: response.data.Countries,
        globalStatus: response.data.Global,
      })
    }catch(err){
      console.log(err);
    }
  }

  render() {
    const {globalStatus,summaryOfCountries} = this.state;
    return (
      <div>
        <NavBar />
        <div className="app-display">
          <div className="app-status">
           <Cases globalStatus={globalStatus}/>
            <Chart />
            <Map />
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
