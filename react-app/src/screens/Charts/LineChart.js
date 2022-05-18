import React from "react";
import { Container } from "react-bootstrap";
import {
    VictoryChart,
    VictoryVoronoiContainer,
    VictoryGroup,
    VictoryAxis,
    VictoryBar,
    VictoryLine,
    VictoryLegend,
} from "victory";
import { useState, useEffect } from "react";
const LineChart = (props) => {
    const [stateChart, setStateC] = useState({
        xAxisCategory:undefined,
        legend: {},
        annotations: [],
    });

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

        console.log('props.legend',props.legend,'----');
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
    }, [props.yAxis , props.legend]);


    const width = 800;
    const height = 500;

    return (
        <>
            {props.legend == undefined || props.legend == "none" ? (
                <VictoryChart
                    domainPadding={10}
                    height={400}
                    width={400}
                    containerComponent={<VictoryVoronoiContainer />}
                >
                    <VictoryGroup colorScale={"qualitative"} offset={2}>
                        {/* Change here */}
                        {props.yAxis.length ? (
                            props.yAxis.map((y) => (
                                <VictoryLine
                                    data={props.data}
                                    x={(d) => d[props.xAxis]}
                                    y={(d) => d[y]}
                                    barWidth={2}
                                />
                            ))
                        ) : (
                            <p></p>
                        )}
                    </VictoryGroup>
                    <VictoryAxis
                        label={props.xAxis}
                        style={{
                           
                            ticks: {
                                stroke: "grey",
                                size: 1,
                                transform: "rotate(90deg)",
                            },
                            tickLabels: { fontSize: 15, padding: 5 },
                        }}
                    />
                </VictoryChart>
            ) : (
                <VictoryChart
                    domainPadding={10}
                    height={height}
                    width={width}
                    containerComponent={<VictoryVoronoiContainer />}
                    colorScale={"qualitative"}
                >
                    <VictoryLegend
                        x={50}
                        y={5}
                        title="Legend"
                        centerTitle
                        orientation="horizontal"
                        gutter={50}
                        style={{
                            border: { stroke: "black" },
                            title: { fontSize: 12 },
                            labels: { fontSize: 11 },
                        }}
                        // data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
                        colorScale={"qualitative"}
                        data={stateChart.annotations}
                    />

                    <VictoryGroup colorScale={"qualitative"} offset={2}>
                        {props.yAxis.length ? (
                            (Object.values(stateChart.legend) || []).map((el) => {
                                // console.log("el", el);
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
                        ) : (
                            <p>nothing here</p>
                        )}
                    </VictoryGroup>

                    <VictoryAxis
                        label={props.xAxis}
                        style={{
                            tickLabels: { fontSize: 15, padding: 5 },
                        }}
                    />
                    <VictoryAxis dependentAxis />
                </VictoryChart>
            )}
        </>
      
    );
};

export default LineChart;
