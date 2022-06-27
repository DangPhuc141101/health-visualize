import React from 'react'
import { VictoryChart, VictoryGroup, VictoryAxis, VictoryTheme, VictoryLegend, VictoryTooltip, VictoryArea } from 'victory';
import { sum, max, min, average, countColumn, getLegend } from "../../hook/index"
import calculateTextWidth from "calculate-text-width";

const AreaChart = (props) => {
    const { xAxis, yAxis, data, legend } = props;
    const colors = ["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]
    // config 
    const width = 800, height = 500;
    const style = {
        area: { data: { stroke: "#c43a31", strokeWidth: 1, strokeLinecap: "round", fillOpacity: 0.5, fill: '#1D81A2' }},
        xAxis: {
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 14, padding: 35 },
            // ticks: { stroke: "grey", size: 1},
            tickLabels: { fontSize: 10, padding: 10, },  // angle: 45
        },
        yAxis: {
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 14, alignItems: 'left', padding: 35 },
            tickLabels: { fontSize: 10, padding: 5 },
            ticks: {
                size: () => {
                    const tickSize = 10;
                    return tickSize;
                },
                stroke: "black",
                strokeWidth: 1
            },
        },
        labelXAxis: { fontSize: width / 50 },
        labelTick: { fontSize: width / 100 },
        labelYAxis: { fontSize: width / 50, alignItems: 'left', padding: 35 },
        legend: { border: { stroke: "black" }, title: { fontSize: 14 }, labels: { fontSize: 7 } },
        tooltip: {
            stroke: 'grey',
            fill: 'white',
            shadowColor: 'grey',
            shadowWidth: 5
        }
    }
    return (
        <>
            <VictoryChart
                responsive={false}
                theme={VictoryTheme.material}   
                // domainPadding={{ x: [paddingX, paddingX], y: [50, 50] }}
                height={height}
                width={width}
            //</>theme={VictoryTheme.material}
            >
                <VictoryGroup>
                    
                    {(!legend ? yAxis.map((y,index) => {
                        
                        return (<VictoryArea
                            data={max(data, xAxis, y)}
                            x = {d => d[xAxis]}
                            y = {d => d[y]}
                            style={{ data: { stroke: "#c43a31", strokeWidth: 1, strokeLinecap: "round", fillOpacity: 0.4, fill: `${colors[index]}` }}}>
    
                        </VictoryArea>)
                    })
                    :
                    <VictoryArea
                        data={max(data, xAxis, yAxis[0])}
                        x = {d => d[xAxis]}
                        y = {d => d[yAxis[0]]}
                        style={style.area}>

                    </VictoryArea>
                    )}
                    
                </VictoryGroup>
                <VictoryAxis
                    crossAxis
                    label={props.xAxis}
                  
                    tickFormat={(t) => {
                        if (!isNaN(t)) return t;
                        const words = t.split(' ');

                        let result = '';
                        let row = '';
                        for (let word of words) {
                            row += `${word} `;
                            const calculatedWidth = calculateTextWidth(row, `normal ${style.labelTick.fontSize}px sans-serif`)
                            if (calculatedWidth > 21) {
                                result += `\n${word}`;
                                row = `${word} `;
                            }
                            else result += ` ${word}`;
                        }
                        return result;
                    }}
                    style={style.xAxis}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => {
                        if (t % 1000000 === 0)
                            return `${t / 1000000}M`;

                        if (t % 1000 === 0)
                            return `${t / 1000}K`;
                        return t;
                    }}
                    label={(yAxis.length == 1 || legend) ? yAxis[0] : 'Frequency'}
                    style={style.yAxis}
                />
            </VictoryChart>
        </>
    );

}

export default AreaChart;
