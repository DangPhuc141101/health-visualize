import React from 'react';
import { Row, Col } from 'antd';
import calculateTextWidth from "calculate-text-width";
import { VictoryChart, VictoryGroup, VictoryAxis, VictoryBar, VictoryTheme, VictoryLegend, VictoryTooltip, VictoryLine } from 'victory';
import { sum, max, min, average, countColumn, getLegend, getMultiple, dataMultiple } from "../../hook/index"
import { something } from '../../hook/bar';
const { Resizable } = require('react-resizable');
const MultipleChart = (props) => {
    let { xAxis, yAxis, data, legend, express, smallMultiple } = props;
    const multiples = getMultiple(data, smallMultiple);
    const databyMultipe = dataMultiple(data, multiples, smallMultiple);
    const layout = [{ key: 'test', x: 0, y: 0, width: 200, height: 100, zIndex: 1 }]
    // config 
    const width = 400, height = 300;
    const numColumn = countColumn(data, xAxis);

    let padding = (numColumn < 10) ? ((numColumn <= 5) ? 20 : 10) : 5;
    let paddingX = (width - 100 - padding * numColumn) * 1.0 / (numColumn) * 2 / 3;
    let barWidth = (width - 100 - padding * numColumn) * 1.0 / (numColumn) / yAxis.length;

    const style = {
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

    // create a array multiples with format [[element1, element2], [element3, element4], ....] to add data to grid
    /**
     * 
     * @param {*} multiples 
     * @param {*} col 
     * @returns array [[element1, element2], [element3, element4], ....]
     * note function splice in array => this function return a sub array is remove from start index to delete count. (array.splice(startIndex, deleteCount)) can replace item more
     */
    const arrayBlock = (multiples, col = 2) => {
        const blocks = [];
        while (multiples.length) blocks.push(multiples.splice(0, 2));
        return blocks;
    }

    const tempLegend = getLegend(data, legend);
    const legendBar = [];
    tempLegend.forEach(e => legendBar.push(e))

    const newData = something(data, legendBar, legend, yAxis[0], xAxis);

    const legends = [];
    if (legend) {
        legendBar.forEach(legend => legends.push({ name: legend }));
        barWidth = (width - 100 - padding * numColumn) * 1.0 / (numColumn) / legendBar.length;
    }
    else {
        yAxis.forEach(e => {
            legends.push({ name: e });
        })
    }

    return (
        <>
            {/* <VictoryLegend x={125} y={10}
                                            centerTitle
                                            orientation="horizontal"
                                            colorScale="qualitative"
                                            gutter={20}
                                            itemsPerRow={10}
                                            style={style.legend}
                                            data={legends}
                                        /> */}
            {arrayBlock([...multiples]).map((row) => {
                return (
                    <Row>
                        {row.map(col => {
                            data = databyMultipe[col];

                            return (
                                <Col span={12}>
                                    <VictoryChart
                                        responsive={false}
                                        domainPadding={{ x: [paddingX, paddingX], y: [0, 50] }}
                                        width={width}
                                        height={height}
                                        theme={VictoryTheme.material}
                                    >

                                        <VictoryGroup offset={barWidth}
                                            colorScale={"qualitative"}
                                            style={{
                                                data: { strokeWidth: 0.5, fillOpacity: 0.4 }
                                            }}
                                        >
                                            {(!legend ?
                                                yAxis.map((y, i) => {
                                                    let dataByExpress = sum(data, xAxis, y);

                                                    // if (express[i] === 'Sum') dataByExpress = sum(data, xAxis, y);
                                                    // if (express[i] === 'Average') dataByExpress = average(data, xAxis, y);
                                                    // if (express[i] === 'Min') dataByExpress = min(data, xAxis, y);
                                                    // if (express[i] === 'Max') dataByExpress = max(data, xAxis, y);
                                                    return (
                                                        <VictoryBar
                                                            key={i}
                                                            data={dataByExpress}
                                                            x={d => d[xAxis]}
                                                            y={d => d[y]}
                                                            barWidth={barWidth}
                                                            style={{
                                                                labels: { fontSize: 7 }
                                                            }}
                                                            labels={
                                                                ({ datum }) => {
                                                                    let result = '\n';
                                                                    for (let key in datum) {
                                                                        if (key === xAxis || yAxis.includes(key)) {
                                                                            result += `${key}: ${datum[key]}\n`;
                                                                        }
                                                                    }
                                                                    return result;
                                                                }}
                                                            labelComponent={
                                                                <VictoryTooltip
                                                                    flyoutStyle={style.tooltip}
                                                                />
                                                            }
                                                        />
                                                    )
                                                })
                                                :
                                                legendBar.map((subLegend, i) => {
                                                    const dataByLegend = newData[subLegend];
                                                    return (
                                                        <VictoryBar
                                                            key={i}
                                                            data={dataByLegend}
                                                            x={d => { return d[xAxis] }}
                                                            y={d => d[yAxis[0]]}
                                                            barWidth={barWidth}
                                                            style={{
                                                                labels: { fontSize: 8 }
                                                            }}
                                                            labels={
                                                                ({ datum }) => {
                                                                    let result = '\n';
                                                                    for (let key in datum) {
                                                                        if (key === xAxis || yAxis.includes(key)) {
                                                                            result += `${key}: ${datum[key]}\n`;
                                                                        }
                                                                    }
                                                                    result += `${legend}: ${subLegend}\n`
                                                                    return result;
                                                                }}
                                                            labelComponent={
                                                                <VictoryTooltip
                                                                    flyoutStyle={style.tooltip}
                                                                />
                                                            }
                                                        />
                                                    )
                                                }))}
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
                                                    if (calculatedWidth > barWidth * yAxis.length) {
                                                        result += `\n${word}`;
                                                        row = `${word} `;
                                                    }
                                                    else result += ` ${word}`;
                                                }
                                                return result;
                                            }}
                                            style={{
                                                axis: { stroke: "#756f6a" },
                                                axisLabel: style.labelXAxis,
                                                tickLabels: style.labelTick,
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
                                                axis: { stroke: "#756f6a" },
                                                axisLabel: style.labelYAxis,
                                                tickLabels: style.labelTick,
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
                                </Col>
                            )
                        })}
                        <Col></Col>
                    </Row>
                )
            })}
        </>
    );
}

export default MultipleChart;