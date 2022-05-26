import React from "react";
import { sum, max, min, average, countColumn, getLegend } from "../../hook/index"
import { Container } from "react-bootstrap";
import {
    VictoryChart,
    VictoryVoronoiContainer,
    VictoryGroup,
    VictoryAxis,
    VictoryBar,
    VictoryLine,
    VictoryLegend,
    VictoryTheme,
} from "victory";
import { useState, useEffect } from "react";
const LineChart = (props) => {
    const [stateChart, setStateC] = useState({
        xAxisCategory: undefined,
        legend: {},
        annotations: [],
    });

    const { xAxis, yAxis, legend } = props;

    const dataByLegend = (data, legends, legendField, yAxis, xAxis) => {
        const result = {};
        (legends || []).forEach((legend) => {
            const dataByLegend = [];
            (data || []).forEach((object) => {
                if (object[legendField] === legend) {
                    let obj = {};
                    obj[xAxis] = object[xAxis];
                    obj[yAxis] = object[yAxis];
                    dataByLegend.push(obj);
                }
            });
            if (dataByLegend) result[legend] = dataByLegend;
        });
        return result;
    };

    //===============================================================

    useEffect(() => {

        console.log('props.legend', props.legend, '----');
        if (!(!!props.legend)) {
            console.log("legend is not choosen");
        } else {
            const legendArrTemp = [];

            // get set of legend (trả về tập các giá trị legend ko trùng lặp)
            (props.data || []).map((item) => {
                legendArrTemp.push(`${item[`${props.legend}`]}`);
            });
            const legendArr = Array.from(new Set(legendArrTemp));
            console.log("this is legend categories: ", legendArr);

            const dataAnnotation = legendArr.map((label) => {
                return { name: `${label}` };
            });

            // -----------------
            const xAxisCategoryTemp = [];
            (props.data || []).map((item) => {
                try {
                    xAxisCategoryTemp.push(`${item[`${props.xAxis}`]}`);
                } catch (e) {
                    console.log(e);
                }

                // xAxisCategoryTemp.push(item[`${props.xAxis}`])
            });
            const xAxisCategoryTemp1 = Array.from(
                new Set(xAxisCategoryTemp)
            ).sort();

            const testLegend = dataByLegend(
                props.data,
                legendArr,
                props.legend,
                props.yAxis,
                props.xAxis
            );

            setStateC({
                xAxisCategory: xAxisCategoryTemp1,
                annotations: dataAnnotation,
                legend: testLegend,
            });

        }
    }, [props.yAxis, props.legend]);


    const width = 800;
    const height = 500;

    return (
        <>
            <VictoryChart
                domainPadding={10}
                height={height}
                width={width}
                containerComponent={<VictoryVoronoiContainer />}
                colorScale={"qualitative"}
                theme={VictoryTheme.material}
            >
                <VictoryLegend x={125} y={10}
                    centerTitle
                    orientation="horizontal"
                    colorScale="qualitative"

                    itemsPerRow={10}
                    style={{ border: { stroke: "black" }, title: { fontSize: 14 }, labels: { fontSize: 8 } }}
                    data={stateChart.annotations}
                />

                <VictoryGroup colorScale={"qualitative"} offset={2}>
                    {/* Change here */}
                    {(!legend || legend === 'none') ? props.yAxis.map((y) => (
                        <VictoryLine
                            data={sum(props.data, xAxis, y)}
                            x={(d) => d[props.xAxis]}
                            y={(d) => d[y]}
                            barWidth={2}
                        />
                    ))
                        :
                        (Object.values(stateChart.legend) || []).map((el) => {
                            return (
                                <VictoryLine
                                    categories={{
                                        x: stateChart.xAxisCategory || [],
                                    }}
                                    data={el}
                                    x={(d) => {
                                        return `${d["Year"]}`;
                                    }}
                                    y={(d) => d[`${props.yAxis[0]}`]}
                                    barWidth={2}
                                />
                            );
                        })
                    }

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
                            if (row.length > 15) {
                                result += `\n${word}`;
                                row = `${word} `;
                            }
                            else result += ` ${word}`;
                        }
                        return result;
                    }}
                    style={{
                        axis: { stroke: "#756f6a", },
                        axisLabel: { fontSize: 14, padding: 60, flex: 'left' },
                        // ticks: { stroke: "grey", size: 1},
                        tickLabels: { fontSize: 8, padding: 10, },  // angle: 45
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
                    crossAxis
                    label={(yAxis.length == 1 || legend) ? yAxis[0] : 'Frequency'}
                    style={{

                        axisLabel: { fontSize: 14, alignItems: 'left', padding: 35 },
                        tickLabels: { fontSize: 8, padding: 5 },
                    }}
                />
            </VictoryChart>
        </>
    )
};

export default LineChart;