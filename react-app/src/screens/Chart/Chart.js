import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import './chart.css';
import ChartItems from './ChartItems/ChartItems';
import DataColumns from './dataColumns/DataColumns';
import Legend from './legend/Legend';
import Xaxis from './xAxis/Xaxis';
import Yaxis from './yAxis/Yaxis';


const Chart = (props) => {
    const {listObjData} = props;
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [legend, setLegend] = useState([]);
    const [typeChart, setTypeChart] = useState('');
    
    const handlerTypeChart = (typeChart)=> {
      setTypeChart(typeChart);
      console.log(typeChart)
    }

    const handlerXAxis = (id) => {
      if(xAxis.includes(id) === true) {
        return;
      }
      setXAxis(pre => [...pre, id])
    }

    const handlerYAxis = (id) => {
      if(yAxis.includes(id) === true) {
        return;
      }
      setYAxis(pre => [...pre, id])
    }

    const handlerLegend = (id) => {
      if(legend.includes(id) === true) {
        return;
      }
      setLegend(pre => [...pre, id])
    }

    const dragstart_handler = (e, column) => {
      e.dataTransfer.setData("text", column)
      e.effectAllowed = 'copyMove';
    }

    const dragover_handler = (e) => {
      e.preventDefault();
    }

    const drop_handler_xAxis = (e) => {
      e.preventDefault();
      e.currentTarget.style.background = "lightblue";
      const id = e.dataTransfer.getData("text");
      handlerXAxis(id);
      if (id == "src_move" && e.target.id == "dest_move"){
        e.target.appendChild(document.getElementById(id));
        if (id == "src_copy" && e.target.id == "dest_copy") {
          var nodeCopy = document.getElementById(id).cloneNode(true);
          nodeCopy.id = "newId";
          e.target.appendChild(nodeCopy);
      }
    }
  }
    const drop_handler_YAxis = (e) => {
      e.preventDefault();
      e.currentTarget.style.background = "lightblue";
      const id = e.dataTransfer.getData("text");
      handlerYAxis(id);
      if (id == "src_move" && e.target.id == "dest_move"){
        e.target.appendChild(document.getElementById(id));
        if (id == "src_copy" && e.target.id == "dest_copy") {
          var nodeCopy = document.getElementById(id).cloneNode(true);
          nodeCopy.id = "newId";
          e.target.appendChild(nodeCopy);
      }
    }
  }

    const drop_handler_legend = (e) => {
      e.preventDefault();
      e.currentTarget.style.background = "lightblue";
      const id = e.dataTransfer.getData("text");
      handlerLegend(id);
      if (id == "src_move" && e.target.id == "dest_move"){
        e.target.appendChild(document.getElementById(id));
        if (id == "src_copy" && e.target.id == "dest_copy") {
          var nodeCopy = document.getElementById(id).cloneNode(true);
          nodeCopy.id = "newId";
          e.target.appendChild(nodeCopy);
      }
    }
  }

  const dragend_handler = (e) => {
    e.target.style.border = "solid gray";
    e.dataTransfer.clearData();
  }

  const handleDeletedXAxis = (e) => {
    const data = xAxis.filter((item) => item !== e)
    setXAxis(data);
  }

  const handleDeletedYAxis = (e) => {
    const data = yAxis.filter((item) => item !== e)
    setYAxis(data);
  }

  const handleDeletedLegend = (e) => {
    const data = legend.filter((item) => item !== e)
    setLegend(data);
  }
  
  return (
    <>
        <div className='chart_container'>
          {/* ======== left ========= */}
             <div className='chart_title'>
               {/* ======= Name of dataset and filter ====== */}
                <div className='chart_columns'>
                  {/* Name of dataset */}
                  <DataColumns 
                    columns={props.columns}
                    dragstart_handler = {dragstart_handler}
                    dragend_handler = {dragend_handler}
                  />
                </div>
                {/* ======== Name of chart and Axis ========= */}
                <div className='chart_names'>
                  <ChartItems getTypeChart = {handlerTypeChart}/>
                  {/* ===== Axis ====== */}
                  <div className='chart_axis'>
                      <div className='axis_container'>
                            {/* === X === */}
                            <Xaxis 
                              xAxis={xAxis} 
                              drop_handler_xAxis={drop_handler_xAxis} 
                              dragover_handler={dragover_handler}
                              handleDeletedXAxis = {handleDeletedXAxis}
                            />
                            {/* === Y === */}
                            <Yaxis
                              yAxis={yAxis} 
                              drop_handler_YAxis={drop_handler_YAxis} 
                              dragover_handler={dragover_handler}
                              handleDeletedYAxis = {handleDeletedYAxis}
                            />
                            {/* === Legend === */}
                            <Legend
                              legend={legend} 
                              drop_handler_legend={drop_handler_legend} 
                              dragover_handler={dragover_handler}
                              handleDeletedLegend = {handleDeletedLegend}
                            />
                      </div>
                  </div>
                </div>
              </div>
              {/* ====== right ========= */}
            <div className='chart_draw'>
              {typeChart === 'table' && props.listObjData ? <Table columns={props.columns} data={props.data}/> : (null)}
              {typeChart === "bar" && listObjData && xAxis[0] && yAxis.length > 0 ? <BarChart yAxis={yAxis} xAxis={xAxis[0]} data={props.listObjData} legend={legend[0]}></BarChart> : (null)}
              {typeChart === "pie" && props.listObjData && xAxis && yAxis.length > 0? <PieChart value={yAxis} legend={xAxis} data={props.listObjData}></PieChart> : (null)}
            </div>
        </div>
    </>
  )
}

export default Chart