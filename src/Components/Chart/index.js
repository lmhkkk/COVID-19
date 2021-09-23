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

      },
      series: [
        {
          name: "Total Cases",
          data: [1, 2, 1, 4, 3, 1, 5, 7, 9],
        },
      ],
    }
  }
  render() {
    return (
      <div >
      <HighchartsReact highcharts={Highcharts} options={this.state.options} />
    </div>
    )
  }
}
export default Chart;
