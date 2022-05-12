import React, { useState } from 'react'
import { Container } from "react-bootstrap";
import { VictoryChart, VictoryVoronoiContainer, VictoryGroup, VictoryAxis, VictoryBar, VictoryLegend, VictoryLabel } from 'victory';
import { sum, max, min, average, countColumn } from "../hook/index";

const BarChartTest = (props) => {
    
    const [isShow, setIsShow] = useState(false);
    const height = 600, width = 900;
    const numColumn = countColumn(props.data,props.xAxis)*props.yAxis.length;
    const maxBarWidth =width/numColumn ;
    console.log(maxBarWidth)
    //1.0*(width-20*(numColumn*1.0/props.yAxis.length-1))/numColumn ;
    const paddingDomain =1.0*maxBarWidth/2;
    const showDetail = (isShow) => {
        setIsShow(isShow);
    }

    const legends = [];
    if (props.yAxis.length > 0) {
        props.yAxis.forEach(element => legends.push({ name: element }))
    }

    const styles = () =>{
        const BLUE_COLOR = "#00a3de";
        const RED_COLOR = "#7c270b";
        return {
          'parent': {
            background: "#ccdee8",
            boxSizing: "border-box",
            display: "inline",
            padding: 0,
            fontFamily: "'Fira Sans', sans-serif"
          }
        }
    }

    return (
        <div style={{height: height, width: width}}>   
             <svg style={styles().parent} viewBox="0 0 600 300" width={900} height={600}>
             <g transform={"translate(0, 40)"} >
                <VictoryGroup colorScale={"qualitative"} offset={25}  standalone={false}>
                    {/* Change here */}
                    {props.yAxis.length > 0 && props.xAxis && props.yAxis.length > 0 ? props.yAxis.map((y, i) =>
                        <VictoryBar
                            alignment='start'
                            data={average(props.data, props.xAxis, y)}
                            x={(d) => d[props.xAxis]}
                            y={d => d[y]}
                            barWidth={25}
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
                    standalone={false}
                    crossAxis 
                    width={500}
                    label={props.xAxis}
                    style={{
                        axis: { stroke: "#756f6a" },
                        axisLabel: { fontSize: 15},
                        // ticks: { stroke: "grey", size: 1},
                        tickLabels: { fontSize: 5}  // angle: 45
                    }}
                />

                {/* Frenquenly */}
                <VictoryAxis
                    standalone={false}
                    dependentAxis                
                    crossAxis   
   
                    label={"Frequency"}
                    style={{
                        axis: { stroke: "#756f6a" },
                        axisLabel: { fontSize: 15, alignItems: 'left' },
                        tickLabels: { fontSize: 10, padding: 5 }
                    }}
                />
            </g>
            </svg>
        </div>
    );
}

export default BarChartTest;
