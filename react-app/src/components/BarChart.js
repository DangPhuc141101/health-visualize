import React from 'react'
import { Container } from "react-bootstrap";
import {VictoryChart, VictoryVoronoiContainer, VictoryGroup, VictoryAxis, VictoryBar} from 'victory';

const BarChart = (props) => {
    return (
        <VictoryChart
            domainPadding={10}
            height={400}
            width={400}
            containerComponent={<VictoryVoronoiContainer />}
        >
            <VictoryGroup colorScale={"qualitative"} offset={2} style = {{margin:'50%'}}>
                {props.yAxis.length ? props.yAxis.map(y =>
                    <VictoryBar
                        data={props.data}
                        x={(d) => d[props.xAxis]}
                        y={d => d[y]}
                        barWidth={2}
                        style = {{margin:'50%'}}
                    />) : <p></p>}
                
            </VictoryGroup>
            <VictoryAxis
                label={props.xAxis}
                style={{
                    axisLabel: { fontSize: 14, padding: 30 },
                    ticks: { stroke: "grey", size: 1, transform: 'rotate(90deg)' },
                    tickLabels: { fontSize: 15, padding: 5 },
                }}

            />
        </VictoryChart>
    );
}

export default BarChart;
