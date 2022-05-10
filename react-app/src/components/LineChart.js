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
    //create useEffect to catch change when any props change, or any props is not choosen

    //this is annotations
    const dataLegend = props.yAxis.map((label) => {
        return { name: `${label}` };
    });

   
    const legendArrTemp = [];

    const xAxisCategoryTemp = [];

    const [dataLe, setDataLe] = useState();

    const a = [
        { x: 3, y: 7 },
        { x: 5, y: 9 },
        { x: 7, y: 99 },
    ];

    // console.log("DAta----", props.data);

    //get set of legend (trả về tập các giá trị legend ko trùng lặp)
    props.data.map((item) => {
        legendArrTemp.push(`${item[`${props.legend}`]}`);
    });
    const legendArr = Array.from(new Set(legendArrTemp));
    // console.log("this is legend categories: ", legendArr);

    const dataLegend2 = legendArr.map((label) => {
        return { name: `${label}` };
    });
    

    //-----------------
    props.data.map((item) => {
        xAxisCategoryTemp.push(`${item[`${props.xAxis}`]}`);
        // xAxisCategoryTemp.push(item[`${props.xAxis}`])
    });
    const xAxisCategory = Array.from(new Set(xAxisCategoryTemp)).sort();
    console.log("this is xAxis categories: ", xAxisCategory);

    //check if legend is exist
    // if (props.legend === "none" || props.legend === undefined) {
    //     console.log("not exist legend", props.legend);
    // } else {
    //     console.log("exist legend", props.legend);
    // }

    // console.log("array after push data: ", legendArrTemp);
    // console.log("legend filter: ", legendFilter)

    const dataByLegend = (data, legends, legendField, yAxis, xAxis) => {
        const result = {};
        legends.forEach((legend) => {
            const dataByLegend = [];
            data.forEach((object) => {
                if (object[legendField] === legend) {
                    let obj = {};
                    obj[xAxis] = object[xAxis];
                    obj[yAxis] = object[yAxis];
                    dataByLegend.push(obj);
                }
            });
            if (dataByLegend) result[legend] = dataByLegend;
        });
        // setDataLe(result);
        return result;
    };

    const testLegend = dataByLegend(
        props.data,
        legendArr,
        props.legend,
        props.yAxis,
        props.xAxis
    );
    // console.log("testLegend++++++++++++++", testLegend);
    // console.log(Object.values(testLegend));
    const width = 800
    const height = 500

    return (
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
                style={{ border: { stroke: "black" }, title: { fontSize: 12 }, labels: { fontSize: 11 } }}
                // data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
                colorScale={"qualitative"}
                // data={dataLegend}
                data={dataLegend2}
            />

            <VictoryGroup colorScale={"qualitative"} offset={2}>
            {props.yAxis.length ? (
                (Object.values(testLegend) || []).map((el) => {
                    
                    console.log("el", el);
                    return (
                        <VictoryLine
                            categories={{
                                x: xAxisCategory,
                            }}
                            data={el}
                            x={(d) =>{
                                console.log("el", el)
                                return `${d['Year']}`
                            } }
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
    );
};

export default LineChart;

//================================================================================================================

// const LineChart = (props) => {

//     return (
//         <VictoryChart
//             domainPadding={10}
//             height={400}
//             width={400}
//             containerComponent={<VictoryVoronoiContainer />}
//             colorScale={"qualitative"}
//         >
//             {/* <VictoryLegend
//                 x={125}
//                 y={10}
//                 title="Legend"
//                 centerTitle
//                 orientation="vertical"
//                 gutter={20}
//                 style={{ border: { stroke: "black" }, title: { fontSize: 10 } }}
//                 // data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
//                 colorScale={"qualitative"}
//                 data={dataLegend}
//             /> */}
//              <VictoryGroup colorScale={"qualitative"} offset={2}>
//             {/* Change here */}
//                 {props.yAxis.length ? props.yAxis.map(y =>
//                     <VictoryLine
//                         data={props.data}
//                         x={(d) => {
//                             // console.log("d[props.xAxis]", d[props.xAxis])
//                                 return d[props.xAxis]
//                         }}
//                         y={d => {
//                             console.log("dy",d[y])
//                             return d[y]}}
//                         barWidth={2}
//                     />) : <p></p>}

//             </VictoryGroup>
//             <VictoryAxis
//                 label={props.xAxis}
//                 style={{
//                     // axis: { stroke: "#756f6a" },
//                     // axisLabel: { fontSize: 20, padding: 30 },
//                     // grid: { stroke: ({ tick }) => tick > 0.5 ? "red" : "grey" },
//                     //  ticks: { stroke: "red", size: 5, transform: 'rotate(90deg)' },
//                     tickLabels: { fontSize: 15, padding: 5 },
//                 }}
//             />
//             <VictoryAxis dependentAxis />
//         </VictoryChart>
//     );
// };

// export default LineChart;

/*
<VictoryGroup colorScale={"qualitative"} offset={2}>
                // Change here 
                {props.yAxis.length ? (
                    props.yAxis.map((y) => (
                        <VictoryLine
                            data={(props.data)}
                            x={(d) => d[props.xAxis]}
                            // y={(d) => d[y]}
                            y={(d) => {console.log("this is dy: ",d[y]); console.log("this is d", d);console.log("this is d xName", d['xName']); return d[y];}}
                            // y={"hihi"}
                            barWidth={2}
                            // label={(d)=>{return d['xName']}}
                            
                        />
                    ))
                ) : (
                    <p></p>
                )}
</VictoryGroup>


export default LineChart;
*/
