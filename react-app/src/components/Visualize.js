import React, { useState, useEffect } from 'react'
import { VictoryBar, VictoryChart, VictoryHistogram, VictoryVoronoiContainer, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis } from 'victory';
import { Container, Row, Col } from 'react-bootstrap';
import BarChart from './BarChart';
import PieChart from './PieChart/PieChart';

const Visualize = (props) => {
    const [columnsSelected, setColumnsSelected] = useState([]);
    const [typeChart, setTypeChart] = useState();
    const [xAxis, setXAxis] = useState();
    const [yAxis, setYAxis] = useState([]);
    const [size, setSize] = useState();
    const [color, setColor] = useState();

    const addColumn = (e) => {
        if (e.target.checked) {
            setYAxis((preveColumnsSelected) => [...preveColumnsSelected, e.target.value]);
        }
        else {
            setYAxis((preveColumnsSelected) => preveColumnsSelected.filter(column => column !== e.target.value))
        }
    }

    const handleChangeChart = (e) => {
        setTypeChart(e.target.value)
    }

    const handleChangeXAxis = (e) => {
        setXAxis(e.target.value);
    }

    const handleChangeYAxis = (e) => {
        setYAxis(e.target.value)
    }

    const handleChangeSize = (e) => {
        console.log(e.target.value)
        setSize(e.target.value);
    }

    const handleChangeColor = (e) => {
        setColor(e.target.value);
    }

    return (
        <Row className='w-100' style={{ height: '100vh' }}>
            <Col className='border-right border-dark' xs={12} md={8}>
                {/* <BarChart data={props.data} X={xAxis} Y={yAxis} color={color} size={size} width={'500px'} height={'100vh'}></BarChart> */}
                {typeChart === "bar" && props.listObjData && xAxis ? <BarChart yAxis={yAxis} xAxis={xAxis} data={props.data}></BarChart> : <p></p>}
                {/* tham số data nên dung props.listObjData/*/}
                {typeChart === "line" ? <p>Line</p> : <p></p>}
                {typeChart === "pie" && props.listObjData ? <PieChart data={props.listObjData} xAxis={xAxis} yAxis={yAxis}/> : <p></p>}
                {typeChart === "scatter" ? <p>Scatter</p> : <p></p>}
            </Col>
            <Col xs={6} md={4}>
                <Container className='h-50 w-100 overflow-auto p-3' style={{ borderBottom: '2px solid #000' }}>
                    <label>Y</label>
                    {props.columns ? props.columns.map(column => (
                        <div className='p-1 mt-2'>
                            <input type="checkbox" id={column} name={column} value={column} onChange={addColumn} />
                            <span className="mx-1">{props.types[column] === "object" ? "AZ" : "09"}</span>
                            <label>{column}</label>
                        </div>
                    )) : <p>    </p>}
                </Container>
                <Container className='h-50 w-100 overflow-auto p-3'>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Select chart style</label>
                        <select className='w-50' onChange={handleChangeChart}>
                            <option className='text-center' value="none">None</option>
                            <option className='text-center' value="bar">Bar</option>
                            <option className='text-center' value="line">Line</option>
                            <option className='text-center' value="pie">Pie</option>
                            <option className='text-center' value="scatter">Sctter</option>
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>X</label>
                        <select className='w-50' onChange={handleChangeXAxis}>
                            <option className='text-center' value="none">None</option>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : <p></p>}
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Size</label>
                        <select className='w-50' onChange={handleChangeSize}>
                            <option className='text-center' value="none">None</option>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : <p></p>}
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Color</label>
                        <select className='w-50' onChange={handleChangeColor}>
                            <option className='text-center' value="none" onChange={handleChangeColor}>None</option>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : <p></p>}
                        </select>
                    </div>
                </Container>
            </Col>
        </Row>
    );
}

export default Visualize;