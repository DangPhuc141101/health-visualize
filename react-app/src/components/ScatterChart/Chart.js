import React,{useMemo} from 'react'
// import { Container } from "react-bootstrap";
import * as d3 from "d3";
import {VictoryChart, VictoryVoronoiContainer, VictoryScatter, VictoryGroup, VictoryLegend} from 'victory';
const ScatterChart = (props) => {
    const dataLegend = props.yAxis.map((label) => {
        return {"name": `${label}`}
    })
    // options: {
    //     scales: {
    //       xAxis: {
    //         type: 'linear',
    //         position: 'bottom'
    //       }
    //     }
    //   }
    console.log(props.xAxis)
    return (
            
        <VictoryChart
            domainPadding={10}
            height={500}
            width={800}
            containerComponent={<VictoryVoronoiContainer />}
        >
       <VictoryGroup colorScale={"qualitative"} style = {{margin:'50%'}} >
        {
            props.yAxis.map(element =>
            <VictoryScatter
            // style = {{padding:'50%'}}
                // style={{ data: {  height:'100%', width:'100%' , }}}
                size = {
                    (d)=>{
                        console.log(d,"dddd")
                        return (d.datum[props.xAxis])/10
                    }
                }
                data={props.data}
                x={d=>d[props.xAxis]}
                y={d=>d[element]}
                
            />
            
            )
        }
        </VictoryGroup>
        <VictoryLegend 
                    x={125}
                    y={10}
                    orientation="horizontal"
                    gutter={20}
                    colorScale={"qualitative"}
                    data={dataLegend}
        />
        </VictoryChart>
    );
}

export default ScatterChart;
