import axios from "axios";
import moment from "moment";

const baseAPI = "https://api.covid19api.com";

const CountryAPI = {
  statusByCountry: (countryId)=>{
    return axios.get(`${baseAPI}/country/${countryId}?from=2021-01-01T00:00:00&to=${moment().utc(0)
      .format("YYYY-MM-DDT00:00:00")}`);
  },
  statusOverWorld:()=>{
    return axios.get(`https://api.covid19api.com/world`);
  },
  summary: ()=>{
    return axios.get(`${baseAPI}/summary`);  
  },
  fetchMapDataByCountry: (countryCode) => {
     return axios.get(`https://code.highcharts.com/mapdata/countries/${countryCode}/${countryCode}-all.geo.json`)
  }, 
  fetchMapDataWorld: () =>{
    return axios.get(`https://code.highcharts.com/mapdata/custom/world-highres.geo.json`);
  }
}

export default CountryAPI;