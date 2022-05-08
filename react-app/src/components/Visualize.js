import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BarChart from './BarChart';
import PieChart from './PieChart';

const Visualize = (props) => {
    const [typeChart, setTypeChart] = useState();
    const [xAxis, setXAxis] = useState();
    const [yAxis, setYAxis] = useState([]);
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [legend, setLegend] = useState();

    const addYAxis = (e) => {
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

    const handleChangeLegend = (e) => {
        if (e.target.value !== 'none') setLegend(e.target.value);
        else setLegend('');
    }

    const handleChangeSize = (e) => {
        setSize(e.target.value); 
    }

    const handleChangeColor = (e) => {
        setColor(e.target.value);
    }

    return (
        <Row  style={{ height: 'calc(100vh - 56px)' }}> 
            <Col className='border-right border-dark h-100' xs={10} md={9} >
                {/* <BarChart data={props.data} X={xAxis} Y={yAxis} color={color} size={size} width={'500px'} height={'100vh'}></BarChart> */}
                {typeChart === "bar" && props.listObjData && xAxis && yAxis.length > 0? <BarChart yAxis={yAxis} xAxis={xAxis} data={props.listObjData} legend={legend}></BarChart> : (null)}
                {typeChart === "pie" && props.listObjData && xAxis && yAxis.length > 0? <PieChart value={yAxis} legend={xAxis} data={props.listObjData}></PieChart> : (null)}
            </Col>
            
            <Col>
            {(props.listObjData) ?                 
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
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : null}
                        </select>
                    </div>
                    <div className='mb-2 overflow-auto'>
                    <label>Y</label>
                        {props.columns ? props.columns.map(column => (
                            <div className='p-1 mt-2'>
                                <input type="checkbox" id={column} name={column} value={column} onChange={addYAxis} />
                                <span className="mx-1">{props.types[column] === "object" ? "AZ" : "09"}</span>
                                <label>{column}</label>
                            </div>
                        )) : null}
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Legend</label>
                        <select className='w-50' onChange={handleChangeLegend}>
                            <option className='text-center' value="none">None</option>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : null}
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Size</label>
                        <select className='w-50' onChange={handleChangeSize}>
                            <option className='text-center' value="none">None</option>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : null}
                        </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <label>Color</label>
                        <select className='w-50' onChange={handleChangeColor}>
                            <option className='text-center' value="none" onChange={handleChangeColor}>None</option>
                            {props.columns ? props.columns.map(column => (<option className='text-center' value={column}>{column}</option>)) : null}
                        </select>
                    </div>
                </Container> : null }
            </Col>
        </Row>
    );
}

export default Visualize;