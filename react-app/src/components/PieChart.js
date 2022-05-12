import React, { useState } from 'react'
import { VictoryPie, VictoryVoronoiContainer, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory';
import { sum, max, min, average, countColumn, getLegend } from "../hook/index";

const PieChart = (props) => {
    const { legend, value } = props;
   console.log('Render PieChart')
    const height = 500, width = 800;
    const dataPie = sum(props.data, legend, value[0])
    const xAxis = legend;
    const yAxis = value[0];
    // list value of pie chart
    // get first values which is choiced by user
    const values = dataPie.map(e => e[value[0]]);
    const total = values.reduce((sum, value) => sum + value, 0);

    const percents = [];
    const round = (num) => +(Math.round(num + "e+2") + "e-2")
    values.forEach((value, index) => {
        if (index < values.length - 1)
            return percents.push(round(value / total * 100))
    })
    const lastPercent = round(percents.reduce((sum, value) => sum - value, 100));
    percents.push(lastPercent);

    const legends = [];
    const legendPie = getLegend(props.data, legend);
    legendPie.forEach(legend => legends.push({ name: legend }));

    return (
        <>
            <div style={{ height: height, width: width }}>

                <div style={{ width: 450, height: 350, position: 'absolute', left: 400, top: 200 }}>
                    <VictoryLegend x={250} y={20}
                        title={legend}
                        itemsPerRow={10}
                        centerTitle
                        orientation="vertical"
                        gutter={30}
                        colorScale={"qualitative"}
                        style={{ border: { stroke: "black" }, title: { fontSize: 20 }, labels: { fontSize: 12 } }}
                        data={legends}
                    />
                </div>
                <VictoryLabel x={50} y={55} text={`Sum of ${yAxis} by ${legend}`} />
                <VictoryPie
                    height={height}
                    width={width}
                    colorScale={'qualitative'}
                    data={dataPie}
                    x={legend}
                    y={yAxis}
                    labels={(d) => {   
                        return `${legend}: ${d.datum[legend]}\n ${yAxis}: ${d.datum[yAxis]}(${percents[d.index]}%)`; }}
                    labelComponent={
                        <VictoryTooltip
                            orientation={'left'}
                            dx={(d)=> {
                                return 80;
                            }}
                
                            flyoutStyle={{
                                stroke: 'grey',
                                fill: 'white',
                                shadowColor: 'grey',
                                shadowWidth: 5
                            }}
                        />
                    }
                    style={{
                        labels: {
                            fontSize: 10,
                            padding: 10
                        }
                    }}
                />
            </div>
        </>
    );
}

export default PieChart;