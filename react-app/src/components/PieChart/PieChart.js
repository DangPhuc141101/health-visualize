import React from 'react';
import {VictoryChart ,VictoryPie, VictoryVoronoiContainer, VictoryTooltip, VictoryGroup} from 'victory'
import { Chart } from "react-google-charts";

export const options = {
  title: "My Daily Activities",
};

const PieChart = (props) => {
    console.log(props.data)

  return (
    // <VictoryGroup colorScale={"qualitative"} offset={2}>
    //   {console.log(props.yAxis)}
    //     {props.yAxis.length ? props.yAxis.map(y =>
    //                 // <VictoryPie
    //                 //     data={props.data}
    //                 //     x={(d) => d[props.xAxis]}
    //                 //     y={d => d[y]}
    //                 //     barWidth={2}
    //                 // />
    //                 <VictoryPie
    //                     colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
    //                     standalone={false}
    //                     width={400} height={400}
    //                     data={props.data}
    //                     x={(d) => d[props.xAxis]}
    //                     y={d => d[y]}
    //                     innerRadius={68} labelRadius={100}
    //                     style={{ labels: { fontSize: 10, fill: "black" } }}
    //                 />

    //                 ) : <p></p>}
    // </VictoryGroup>
    <Chart
      chartType="PieChart"
      data={props.data}
      // options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default PieChart
