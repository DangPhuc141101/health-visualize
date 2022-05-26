import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';

import './chart.css';
import ChartItems from './ChartItems/ChartItems';
import DataColumns from './dataColumns/DataColumns';
import Legend from './legend/Legend';
import SmallMultiples from './smallMultiples/SmallMultiples';
import Xaxis from './xAxis/Xaxis';
import Yaxis from './yAxis/Yaxis';



import AreaChart from '../Charts/AreaChart';
import ColumnChart from '../Charts/ColumnChart';

import LineChart from '../Charts/LineChart';

const Chart = (props) => {
    const {listObjData} = props;
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [legend, setLegend] = useState([]);
    const [smallMultiples, setSmallMultiples] = useState([]);
    const [typeChart, setTypeChart] = useState('');
    
    const handlerTypeChart = (typeChart)=> {
      setTypeChart(typeChart);
      console.log(typeChart)
    }

    //  ====== X-Axis =====
    const handlerXAxis = (id) => {
      if(xAxis.includes(id) === true) {
        return;
      }
      setXAxis(pre => [...pre, id])
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

  const handleDeletedXAxis = (e) => {
    const data = xAxis.filter((item) => item !== e)
    setXAxis(data);
  }

    // ====== Y-Axis =====
    const handlerYAxis = (id) => {
      if(yAxis.includes(id) === true) {
        return;
      }
      setYAxis(pre => [...pre, id])
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

  const handleDeletedYAxis = (e) => {
    const data = yAxis.filter((item) => item !== e)
    setYAxis(data);
  }

    // ====== Legend =====
    const handlerLegend = (id) => {
      if(legend.includes(id) === true) {
        return;
      }
      setLegend(pre => [...pre, id])
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

  const handleDeletedLegend = (e) => {
    const data = legend.filter((item) => item !== e)
    setLegend(data);
  }

      //  ====== Small Multiples =====
      const handlerSmallMultiples = (id) => {
        if(smallMultiples.includes(id) === true) {
          return;
        }
        setSmallMultiples(pre => [...pre, id])
      }
  
      const drop_handler_smallMultiples = (e) => {
        e.preventDefault();
        e.currentTarget.style.background = "lightblue";
        const id = e.dataTransfer.getData("text");
        handlerSmallMultiples(id);
        if (id == "src_move" && e.target.id == "dest_move"){
          e.target.appendChild(document.getElementById(id));
          if (id == "src_copy" && e.target.id == "dest_copy") {
            var nodeCopy = document.getElementById(id).cloneNode(true);
            nodeCopy.id = "newId";
            e.target.appendChild(nodeCopy);
        }
      }
    }
  
    const handleDeletedSmallMultiples = (e) => {
      const data = xAxis.filter((item) => item !== e)
      setSmallMultiples(data);
    }

  // ========= Drag - Drop =========
    const dragstart_handler = (e, column) => {
      e.dataTransfer.setData("text", column)
      e.effectAllowed = 'copyMove';
    }

    const dragover_handler = (e) => {
      e.preventDefault();
    }

  const dragend_handler = (e) => {
    e.target.style.border = "solid gray";
    e.dataTransfer.clearData();
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
                            {/* === SmallMultiples === */}
                            <SmallMultiples
                              smallMultiples={smallMultiples}
                              drop_handler_smallMultiples={drop_handler_smallMultiples} 
                              dragover_handler={dragover_handler}
                              handleDeletedSmallMultiples = {handleDeletedSmallMultiples}
                            />
                      </div>
                  </div>
                </div>
              </div>
              {/* ====== right ========= */}
            <div className='chart_draw'>
            {typeChart === "bar" && listObjData && xAxis[0] && yAxis.length > 0 ? <BarChart yAxis={yAxis} xAxis={xAxis[0]} data={props.listObjData} legend={legend[0]}></BarChart> : (null)}
            {typeChart === "column" && listObjData && xAxis[0] && yAxis.length > 0 ? <ColumnChart yAxis={yAxis} xAxis={xAxis[0]} data={props.listObjData} legend={legend[0]}></ColumnChart> : (null)}
            {typeChart === "pie" && props.listObjData && xAxis && yAxis.length > 0? <PieChart value={yAxis} legend={xAxis} data={props.listObjData}></PieChart> : (null)}
            {typeChart === "area" && props.listObjData && xAxis && yAxis.length > 0? <AreaChart yAxis={yAxis} xAxis={xAxis} data={props.listObjData}></AreaChart> : (null)}
            {typeChart === "line" &&
                listObjData &&
                xAxis &&
                yAxis.length > 0 ? (
                    <LineChart
                        yAxis={yAxis}
                        xAxis={xAxis[0]}
                        data={props.listObjData}
                        legend={legend[0]}
                    ></LineChart>
                ) : (
                    (null)
                )}
            </div>
        </div>
    </>
  )
}

export default Chart