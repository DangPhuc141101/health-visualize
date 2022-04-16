import React,{useMemo} from 'react'
// import { Container } from "react-bootstrap";
import * as d3 from "d3";
import {VictoryChart, VictoryVoronoiContainer, VictoryScatter, VictoryGroup, VictoryLegend} from 'victory';
import { useD3 } from "d3blackbox";
const ScatterChart = (props) => {
    return (
        <VictoryChart
            domainPadding={10}
            height={400}
            width={400}
             margin={{
                left: 50,
                right: 10,
                top: 20,
                bottom: 50
             }}
            containerComponent={<VictoryVoronoiContainer />}
        >
       <VictoryGroup colorScale={"qualitative"} offset={2}>
        {
            props.yAxis.map(element =>
            <VictoryScatter
                // style={{ data: { fill: "#c43a31" } }}
                size={7}
                data={props.data}
                x={d=>d[props.xAxis]}
                y={d=>d[element]}
            />
            
            )
            
        }
        </VictoryGroup>
        <VictoryLegend 
                    x={125}
                    y={10}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" } }}
                    colorScale={"qualitative"}
                    data={props.data}
        />
           
        </VictoryChart>
    );
}

export default ScatterChart;
