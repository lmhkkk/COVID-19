import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/map")(Highcharts);

const initOptions = {
  title: {
    text: "",
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, "#ffff00"],
      [0.01, "#bfff00"],
      [0.05, "#b3ff00"],
      [0.1, "#a9ff00"],
      [0.15, "#9eff00"],
      [0.2, "#96ff00"],
      [0.3, "#8fff00"],
      [0.5, "#6fb900"],
      [1, "	#404f00"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "middle",
      align: "left",
    },
  },
  xAxis: {
    maxZoom: 10,
  },
  series: [
    {
      name: "Total Cases",
      joinBy: ["hc-key", "key"],
    },
  ],
};

const Map = (props) => {
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const { summaryOfCountries, worldMap,display } = props;

  useEffect(() => {
    if (worldMap && Object.keys(worldMap).length) {

      const fakeData = summaryOfCountries.map((item) => {
        switch(display){
          case "recovered":
            return({
            key: item.CountryCode.toLowerCase(),
            value: item.TotalRecovered,
          });
          case "death":
            return({
              key: item.CountryCode.toLowerCase(),
              value: item.TotalDeaths,
            });
          default:
            return({
              key: item.CountryCode.toLowerCase(),
              value: item.TotalConfirmed,
            })

        }
      });
      setOptions(() => ({
        ...initOptions,
        title: {
          text: "Global Status",
        },
        series: [
          { ...initOptions.series[0], mapData: worldMap, data: fakeData },
        ],
      }));

      if (!mapLoaded) setMapLoaded(true);
    }
  }, [worldMap,summaryOfCountries, display,mapLoaded]);
  if (!mapLoaded) return null;
  return (
    <div >
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={options}
      />
    </div>
  );
};

Map.defaultProps = {
  mapData: {},
};
export default Map;
