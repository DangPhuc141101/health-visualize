import React, { useState } from 'react'
import { VictoryPie, VictoryVoronoiContainer, VictoryLegend, VictoryLabel } from 'victory';
import { sum, max, min, average, countColumn, getLegend } from "../hook/index";
import Detail from './Detail';

const PieChart = (props) => {
    const {legend, value} = props;
    console.log(value)
    const [position, setPosition] = useState({});
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
            return percents.push(round(value / total))
    })
    const lastPercent = round(percents.reduce((sum, value) => sum - value, 1));
    percents.push(lastPercent);

    const legends = [];
    const legendPie = getLegend(props.data, legend);
    legendPie.forEach(legend => legends.push({ name: legend }));

    return (
        <div style={{ height: height, width: width, paddingTop: 60 }}>
            <div style={{ height: height - 100, width: width - 200 }}>

                <div style={{ width: 450, height: 350, position: 'absolute', zIndex: 1, left: 400, top: 200 }}>
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
                <VictoryLabel x={50} y={55} text={`Sum of ${value[0]} by ${legend}`} />
                <VictoryPie
                    height={300}
                    colorScale={'qualitative'}
                    data={dataPie}
                    x={legend}
                    y={value[0]}
                    labelPlacement={'vertical'}
                    labels={(d, i) => { return `${percents[d.index]}%`; }}
                    style={{
                        labels: {
                            fontSize: 7,
                            padding: 5
                        }
                    }}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onMouseOver: (e) => {
                                return [
                                    {
                                        target: "data",
                                        mutation: (props) => {
                                            // let position= {x: e.clientX, y: e.clientY};
                                            const texts = [];
                                            texts.push(`${xAxis} : ${props[xAxis]}`);
                                            texts.push(`${yAxis} : ${props[yAxis]}`);
                                            setPosition({ x: e.clientX, y: e.clientY });
                                            (<Detail position={position} texts={texts}></Detail>)
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

                                        }
                                    }
                                ]
                            }
                        }

                    }]}
                >
                </VictoryPie>
            </div>
        </div>
    );
}

export default PieChart;