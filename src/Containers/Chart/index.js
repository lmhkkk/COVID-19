import React, { Component } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Chart extends Component {
  state ={
     options : {
      chart: {
        type: "spline",
      },
      title: {
        text: "My chart",
      },
      yAxis: {
        title: {
          text: "",
        },
        max: 10,
      },
    
      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2010 to 2017",
        },
      },
    
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },
      series: [
        {
          name: "test1",
          data: [1, 2, 1, 4, 3, 1, 5, 7, 9],
        },
        {
          name: "test2",
          data: [3, 5, 7, 1, 3, 4, 6, 8, 9],
        },
      ],
    }
  }
  render() {
    return (
      <div>
      <HighchartsReact highcharts={Highcharts} options={this.state.options} />
    </div>
    )
  }
}
export default Chart;
