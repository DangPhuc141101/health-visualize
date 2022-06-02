import React from 'react'
import { VictoryChart, VictoryGroup, VictoryAxis, VictoryTheme, VictoryLegend, VictoryTooltip, VictoryArea } from 'victory';
import { sum, max, min, average, countColumn, getLegend } from "../../hook/index"

const AreaChart = (props) => {
    const { xAxis, yAxis, data, legend } = props;

    // config 
    const width = 800, height = 500;

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
                    {(!legend ? <VictoryArea
                        data={sum(data, xAxis, yAxis[0])}
                        x = {d => d[xAxis]}
                        y = {d => d[yAxis[0]]}
                        style={{ data: { stroke: "#c43a31", strokeWidth: 3, strokeLinecap: "round", fillOpacity: 0.5, fill: '#1D81A2' } }}>

                    </VictoryArea>
                    :
                    <VictoryArea
                        data={max(data, xAxis, yAxis[0])}
                        x = {d => d[xAxis]}
                        y = {d => d[yAxis[0]]}
                        style={{ data: { stroke: "#c43a31", strokeWidth: 3, strokeLinecap: "round", fillOpacity: 0.5, fill: '#1D81A2' } }}>

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
                            if (row.length > 21) {
                                result += `\n${word}`;
                                row = `${word} `;
                            }
                            else result += ` ${word}`;
                        }
                        console.log(result)
                        return result;
                    }}
                    style={{
                        axis: { stroke: "#756f6a" },
                        axisLabel: { fontSize: 14, padding: 35 },
                        // ticks: { stroke: "grey", size: 1},
                        tickLabels: { fontSize: 10, padding: 10, },  // angle: 45
                    }}
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
                    style={{
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
                    }}
                />
            </VictoryChart>
        </>
    );

}

export default AreaChart;
