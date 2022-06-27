import React from 'react';
import { useState } from 'react';

import { Rnd } from "react-rnd";
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

const Wrapper = (props) => {
    const height = 500, width = 800;
    const {xAxis, yAxis, legend, smallMultiples, values, sizes, secondaryY_Axis} = props.fields;
    const {index, type, fields} = props;
    const clickWrapperHandler = (e) => {
        props.onClickWrapper(props.index, props.type );
    }
    const createChart = () => {
        try {
            switch(type){
                case 'column':
                    return (xAxis[0] && yAxis.length > 0  && smallMultiples.length > 0?
                        <ColumnChart 
                            data={props.data} 
                            smallMultiple={smallMultiples[0]} 
                            yAxis={yAxis} xAxis={xAxis[0]} 
                            legend={legend[0]}/>:null)
                case 'bar':
                    return (xAxis[0] && yAxis.length > 0 ? <BarChart data={props.data} yAxis={yAxis} xAxis={xAxis[0]} legend={legend[0]}/> : null)
                case 'pie':
                    return (values[0] && legend[0] ? <PieChart data={props.data} value={values} legend={legend}/> : null)
                // case 'donut':
                //     return <DonutChart/>
                case 'line':
                    return (xAxis && yAxis.length > 0 ? 
                    <LineChart yAxis={yAxis} 
                            xAxis={xAxis[0]}
                            data={props.data}
                            legend={legend[0]}
                        /> : null)
                case 'area':
                    return (xAxis && yAxis.length > 0 ? <AreaChart data={props.data} yAxis={yAxis} xAxis={xAxis[0]} /> : null)
            }
        }
        catch(e) {
            console.log(e)
            return null;
        }
    }

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
                onClick={clickWrapperHandler}
                style={style.rnd}
                default={{
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 300
                }}
                bounds={"parent"}
            >
                {createChart()}
            </Rnd>
    );
}

export default Wrapper;