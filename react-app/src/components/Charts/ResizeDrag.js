import React from 'react';
import { useState } from 'react';
import { Rnd } from "react-rnd";
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory';
import { sum, max, min, average, countColumn, getLegend } from "../../hook/index";

const ResizeDrag = (props) => {
    const {legend_1, setLegend_1} = useState('');
    const {value_2, setValue_1} = useState();

    const { legend, value } = props;

    const height = 500, width = 800;
    const dataPie = sum(props.data, legend, value)

    // list value of pie chart
    // get first values which is choiced by user
    const values = dataPie.map(e => e[value]);
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

    const style = {
        rnd: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 2px #1D81A2",
            borderStyle: "dotted"
        },
        legend: { title: { fontSize: 20 }, labels: { fontSize: 12 },
        tooltip: {
            stroke: 'grey',
            fill: 'white',
            shadowColor: 'grey',
            shadowWidth: 5
        }}
    };
    return (
        
            <Rnd
                style={style.rnd}
                default={{
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 300
                }}
                bounds={"parent"}
            >
                <div style={{flex: "3" }}>
                    {/* <VictoryLegend x={150} y={20}
                        title={legend}
                        itemsPerRow={100}
                        centerTitle
                        orientation="horizontal"
                        colorScale={"qualitative"}
                        style={style.legend}
                        data={legends}
                    /> */}
                    {/* <VictoryLabel x={50} y={55} text={`Sum of ${value} by ${legend}`} /> */}
                    {/* <VictoryPie
                        height={height}
                        width={width}
                        colorScale={'qualitative'}
                        data={dataPie}
                        x={legend}
                        y={value}
                        labels={(d) => {
                            return `${legend}: ${d.datum[legend]}\n ${value}: ${d.datum[value]}(${percents[d.index]}%)`;
                        }}
                        labelComponent={
                            <VictoryTooltip
                                orientation={'left'}
                                dx={(d) => {
                                    return 80;
                                }}
                                flyoutStyle={style.tooltip}
                            />
                        }
                        style={{
                            labels: {
                                fontSize: 10,
                                padding: 10
                            }
                        }}
                    /> */}
                </div>
                    {/* <div style={{flex: "1", height: "100%"}}>
                        <VictoryLegend 
                            title={legend}
                            itemsPerRow={100}
                            centerTitle
                            orientation="vertical"
                            colorScale={"qualitative"}
                            style={style.legend}
                            data={legends}
                        />
                    </div> */}
                    pie
            </Rnd>
    );
}

export default ResizeDrag;