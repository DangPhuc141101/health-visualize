import React, { useState } from 'react'
import { Container } from "react-bootstrap";
import { VictoryChart, VictoryVoronoiContainer, VictoryGroup, VictoryAxis, VictoryBar, VictoryLegend } from 'victory';
import { sum, max, min, average, countColumn } from "../hook/index";

const BarChart = (props) => {
    
    const [isShow, setIsShow] = useState(false);
    const height = 800, width = 800;
    const numColumn = countColumn(props.data,props.xAxis)*props.yAxis.length;
    console.log()
    const maxBarWidth = 1.0*(width-20*(numColumn*1.0/props.yAxis.length-1))/numColumn ;
    console.log(maxBarWidth)
    //1.0*(width-20*(numColumn/props.yAxis.length-1))/numColumn ;
    const padding =1.0*maxBarWidth/2;
    const showDetail = (isShow) => {
        setIsShow(isShow);
    }

    const legends = [];
    if (props.yAxis.length > 0) {
        props.yAxis.forEach(element => legends.push({ name: element }))
    }

    return (
        <div style={{height: 800, width: 800}}>   
            <VictoryChart
                height={height}
                width={width}
                domainPadding={20}
                containerComponent={<VictoryVoronoiContainer />}
            >
                <VictoryGroup colorScale={"qualitative"} offset={30}>
                    {/* Change here */}
                    {props.yAxis.length > 0 && props.xAxis && props.yAxis.length > 0 ? props.yAxis.map((y, i) =>
                        <VictoryBar
                            data={average(props.data, props.xAxis, y)}
                            x={(d) => d[props.xAxis]}
                            y={d => d[y]}
                            barWidth={30}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onMouseOver: (e) => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: (props) => {
                                                    console.log(props.datum);
                                                    setIsShow(true);
                                                }
                                            }
                                        ];
                                    },
                                    onMouseOut: (e) => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: (props) => {
                                                    console.log("Out");
                                                    setIsShow(false);
                                                }
                                            }
                                        ]
                                    }
                                }

                            }]}
                        />) : null}
                </VictoryGroup>
                {legends.length > 0 ? 
                <VictoryLegend 
                    orientation="horizontal"
                    gutter={20}
                    colorScale={"qualitative"}
                    data={legends}
                /> : null}
                <VictoryAxis
                    crossAxis 
                    width={width}
                    label={props.xAxis}
                    style={{
                        axis: { stroke: "#756f6a" },
                        axisLabel: { fontSize: 15, padding: 30 },
                        // ticks: { stroke: "grey", size: 1},
                        tickLabels: { fontSize: 5, padding: 10, }  // angle: 45
                    }}
                />

                {/* Frenquenly */}
                <VictoryAxis
                    dependentAxis
                    crossAxis
                    label={"Frequency"}
                    style={{
                        axis: { stroke: "#756f6a" },
                        axisLabel: { fontSize: 15, alignItems: 'left' },
                        tickLabels: { fontSize: 10, padding: 5 }
                    }}
                />
            </VictoryChart>
        </div>
    );
}

export default BarChart;
