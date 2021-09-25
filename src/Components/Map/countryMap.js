import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { cloneDeep } from "lodash";

require("highcharts/modules/map")(Highcharts);

const initOptions = {
  title: {
    text: "",
  },
  chart:{
    height:"390",
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

const CountryMap = (props) => {
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const {countryMap } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (countryMap && Object.keys(countryMap).length) {
      const fakeData = countryMap.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));  
      console.log(countryMap)
      console.log(fakeData)
      setOptions(() => ({
        ...initOptions,
        title: {
          text: "COVID-19 Status",
        },
        series: [
          { ...initOptions.series[0], mapData:countryMap, data: fakeData },
        ],
      }));
      if (!mapLoaded) setMapLoaded(true);
    }
  }, [countryMap,mapLoaded]);
  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        countryMap,
      });
    }
  }, [options, countryMap]);
  if (!mapLoaded) return null;
  return (
    <div >
      <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={"mapChart"}
      ref={chartRef}

      />
    </div>
  );
};

CountryMap.defaultProps = {
  mapData: {},
};
export default CountryMap;
