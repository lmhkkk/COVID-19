import axios from "axios";

const baseAPI = "https://api.covid19api.com";

const CountryAPI = {
  countries: ()=>{
    return axios.get(`${baseAPI}/counttries`);
  },
  status: (country)=>{
    return axios.get(`${baseAPI}/dayone/country/${country}from=2021-01-01T00:00:00&to=moment().utc(0).format()`);
  },
  summary: ()=>{
    return axios.get(`${baseAPI}/summary`);
  }
}

export default CountryAPI;