import React from "react";
import {
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
  VictoryBar,
  VictoryTheme,
  VictoryLegend,
  VictoryTooltip,
} from "victory";
import {
  sum,
  max,
  min,
  average,
  countColumn,
  getLegend,
} from "../../hook/index";
import { something } from "../../hook/bar";

const ColumnChart = (props) => {
  const { xAxis, yAxis, data, legend } = props;

  // config
  const width = 800,
    height = 500;

  const numColumn = countColumn(data, xAxis);
  let padding = numColumn < 10 ? (numColumn <= 5 ? 20 : 10) : 5;
  let paddingX =
    ((((width - 100 - padding * numColumn) * 1.0) / numColumn) * 2) / 3;
  let barWidth =
    ((width - 100 - padding * numColumn) * 1.0) / numColumn / yAxis.length;

  const tempLegend = getLegend(data, legend);
  const legendBar = [];
  tempLegend.forEach((e) => legendBar.push(e));

  const newData = something(data, legendBar, legend, yAxis[0], xAxis);

  const legends = [];
  if (legend) {
    legendBar.forEach((legend) => legends.push({ name: legend.toString() }));
    barWidth =
      ((width - 100 - padding * numColumn) * 1.0) /
      numColumn /
      legendBar.length;
  } else {
    yAxis.forEach((e) => {
      legends.push({ name: e });
    });
  }

  return (
    <div style={{ width: width, height: height }}>
      <VictoryChart
        responsive={false}
        domainPadding={{ x: [paddingX, paddingX], y: [0, 50] }}
        height={height}
        width={width}
        theme={VictoryTheme.material}
      >
        <VictoryLegend
          x={125}
          y={10}
          centerTitle
          orientation="horizontal"
          colorScale="qualitative"
          gutter={20}
          itemsPerRow={10}
          style={{ title: { fontSize: 14 }, labels: { fontSize: 8 } }}
          data={legends}
        />
        <VictoryGroup offset={barWidth} colorScale={"qualitative"}>
          {!legend
            ? yAxis.map((y, i) => (
                <VictoryBar
                  key={i}
                  data={sum(data, xAxis, y)}
                  x={(d) => d[xAxis]}
                  y={(d) => d[y]}
                  barWidth={barWidth}
                  style={{
                    labels: { fontSize: 8 },
                  }}
                  labels={({ datum }) => {
                    let result = "\n";
                    for (let key in datum) {
                      if (key === xAxis || yAxis.includes(key)) {
                        result += `${key}: ${datum[key]}\n`;
                      }
                    }
                    return result;
                  }}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        stroke: "grey",
                        fill: "white",
                        shadowColor: "grey",
                        shadowWidth: 5,
                      }}
                    />
                  }
                />
              ))
            : legendBar.map((subLegend, i) => {
                const dataByLegend = newData[subLegend];
                return (
                  <VictoryBar
                    key={i}
                    data={dataByLegend}
                    x={(d) => {
                      return d[xAxis];
                    }}
                    y={(d) => d[yAxis[0]]}
                    barWidth={barWidth}
                    style={{
                      labels: { fontSize: 8 },
                    }}
                    labels={({ datum }) => {
                      let result = "\n";
                      for (let key in datum) {
                        if (key === xAxis || yAxis.includes(key)) {
                          result += `${key}: ${datum[key]}\n`;
                        }
                      }
                      result += `${legend}: ${subLegend}\n`;
                      return result;
                    }}
                    labelComponent={
                      <VictoryTooltip
                        flyoutStyle={{
                          stroke: "grey",
                          fill: "white",
                          shadowColor: "grey",
                          shadowWidth: 5,
                        }}
                      />
                    }
                  />
                );
              })}
        </VictoryGroup>
        <VictoryAxis
          crossAxis
          label={props.xAxis}
          tickFormat={(t) => {
            if (!isNaN(t)) return t;
            const words = t.split(" ");
            let result = "";
            let row = "";
            for (let word of words) {
              row += `${word} `;
              if (row.length > 21) {
                result += `\n${word}`;
                row = `${word} `;
              } else result += ` ${word}`;
            }
            return result;
          }}
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 14, padding: 30 },
            // ticks: { stroke: "grey", size: 1},
            tickLabels: { fontSize: 10, padding: 10 }, // angle: 45
          }}
        />

        <VictoryAxis
          dependentAxis
          tickFormat={(t) => {
            if (t % 1000000 === 0) return `${t / 1000000}M`;

            if (t % 1000 === 0) return `${t / 1000}K`;
            return t;
          }}
          crossAxis
          label={yAxis.length == 1 || legend ? yAxis[0] : "Frequency"}
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 14, alignItems: "left", padding: 35 },
            tickLabels: { fontSize: 10, padding: 5 },
            ticks: {
              size: () => {
                const tickSize = 10;
                return tickSize;
              },
              stroke: "black",
              strokeWidth: 1,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default ColumnChart;
