import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const generateOptions = (data, msg) => {
  const categories = data
    .map((item) => moment(item.Date).format("MM/DD/YYYY"))
    .sort();
  data.sort((data1, data2) => {
    data1 = new Date(data1.Date);
    data2 = new Date(data2.Date);
    return data1 - data2;
  });
  const initoptions = {
    chart: {
      type: "spline",
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
    series: [
      {
        name: "",
      },
    ],
  };
  switch (msg) {
    case "recovered":
      return {
        ...initoptions,
        colors:["green"],
        series: [
          {
            ...initoptions.series[0],
            name: "Total Recovered",
            data: data.map((item) => item.TotalRecovered),
          },
        ],
      };
    case "death":
      return {
        ...initoptions,
        colors:["gray"],
        series: [
          {
            ...initoptions.series[0],
            name: "Total Death",
            data: data.map((item) => item.TotalDeaths),
          },
        ],
      };
    default:
      return {
        ...initoptions,
        series: [
          {
            ...initoptions.series[0],
            name: "Total Confirmed",
            data: data.map((item) => item.TotalConfirmed),
          },
        ],
      };
  }
};
export default function LineChart(props) {
  const [options, setOptions] = useState({});
  const { statusOverWorld, display } = props;

  useEffect(() => {
    setOptions(generateOptions(statusOverWorld, display));
  }, [statusOverWorld, display]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
