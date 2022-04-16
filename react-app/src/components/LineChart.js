import React from 'react'
import { Container } from "react-bootstrap";
import {VictoryChart, VictoryVoronoiContainer, VictoryGroup, VictoryAxis, VictoryBar, VictoryLine} from 'victory';

const LineChart = (props) => {
  return  (
     <VictoryChart
         domainPadding={10}
         height={400}
         width={400}
         containerComponent={<VictoryVoronoiContainer />}
     >
         <VictoryGroup colorScale={"qualitative"} offset={2}>
         {/* Change here */}
             {props.yAxis.length ? props.yAxis.map(y =>
                 <VictoryLine
                     data={props.data}
                     x={(d) => d[props.xAxis]}
                     y={d => d[y]}
                     barWidth={2}
                 />) : <p></p>}

         </VictoryGroup>
         <VictoryAxis
             label={props.xAxis}
             style={{
                 // axis: { stroke: "#756f6a" },
                 // axisLabel: { fontSize: 20, padding: 30 },
                 // grid: { stroke: ({ tick }) => tick > 0.5 ? "red" : "grey" },
                 ticks: { stroke: "grey", size: 1, transform: 'rotate(90deg)' },
                 tickLabels: { fontSize: 15, padding: 5 }
             }}

         />
     </VictoryChart>
 );
}

export default LineChart
