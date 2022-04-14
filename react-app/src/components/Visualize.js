import React, { useState, useEffect } from 'react'
import { VictoryBar, VictoryChart, VictoryHistogram, VictoryVoronoiContainer, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip } from 'victory';
import { Container, Row, Col } from 'react-bootstrap';
import BarChart from './BarChart';

const Visualize = (props) => {
    const [columnsSelected, setColumnsSelected] = useState([]);
    const [typeChart, setTypeChart] = useState('bar');
    const [xAxis, setXAxis] = useState();
    const [yAxis, setYAxis] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();

    const addColumn = (e) => {
        if (e.target.checked) {
            setColumnsSelected((preveColumnsSelected) => [...preveColumnsSelected, e.target.value]);
        }
        else {
            setColumnsSelected((preveColumnsSelected) => preveColumnsSelected.filter(column => column !== e.target.value))
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
                {props.data && xAxis && yAxis ?
                    <VictoryChart
                        height={400}
                        width={400}
                        containerComponent={<VictoryVoronoiContainer />}
                    >
                        <VictoryGroup offset={20} colorScale={"qualitative"} >
                            <VictoryBar
                                data={props.listObjData}
                                x={(d) => d[xAxis]}
                                y={d => d[yAxis]}
                                barWidth={10}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                    : <p></p>}
            </Col>
            <Col xs={6} md={4}>
                <Container className='h-50 w-100 overflow-auto p-3' style={{ borderBottom: '2px solid #000' }}>
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
                            <option className='text-center' value="bar">Bar</option>
                            <option className='text-center' value="line">Line</option>
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>X</label>
                        <select className='w-50' onChange={handleChangeXAxis}>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : <p></p>}
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Y</label>
                        <select className='w-50' onChange={handleChangeYAxis}>
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