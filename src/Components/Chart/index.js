import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const generateOptions = (data, status) => {

  data.sort((data1, data2) => {
    data1 = new Date(data1.Date);
    data2 = new Date(data2.Date);
    return data1 - data2;
  });
  const categories = data
    .map((item) => moment(item.Date).utc(0).format("MM/DD/YYYY")).sort();
  const initoptions = {
    chart: {
      type: "spline",
      height:"320",
    },
    title: {
      text: "COVID -19 Chart",
    },
    yAxis: {
      title: {
        text: "",
      },
      min: 0,
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    colors: ["red"],

  };
  switch (status) {
    case "recovered":
      return {
        ...initoptions,
        colors:["green"],
        series: [
          {
            name: "Total Recovered",
            data: data.map((item) => item.Recovered!==undefined?item.Recovered:item.TotalRecovered),
          },
        ],
      };
    case "death":
      return {
        ...initoptions,
        colors:["gray"],
        series: [
          {
            name: "Total Death",
            data: data.map((item) => item.TotalDeaths||item.Deaths),
          },
        ],
      };
      default:
      return {
        ...initoptions,
        series: [
          {
            name: "Total Confirmed",
            data: data.map((item) => item.TotalConfirmed||item.Confirmed),
          },
        ],
      };
  }
};
export default function LineChart(props) {
  const [options, setOptions] = useState({});
  const { statusOverWorld, display,isCountryStatus,summaryOfCountry } = props;

  useEffect(() => {
    !isCountryStatus?setOptions(generateOptions(statusOverWorld, display)):
    setOptions(generateOptions(summaryOfCountry, display));

  }, [statusOverWorld, display,isCountryStatus,summaryOfCountry]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
