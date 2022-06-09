import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';

import './chart.css';
import ChartItems from './ChartItems/ChartItems';
import DataColumns from './dataColumns/DataColumns';
import Legend from './legend/Legend';
import Size from './size/Size';
import SmallMultiples from './smallMultiples/SmallMultiples';
import Value from './value/Value';
import Xaxis from './xAxis/Xaxis';
import Yaxis from './yAxis/Yaxis';

import { AiOutlineDoubleRight } from 'react-icons/ai';

import AreaChart from '../Charts/AreaChart';
import ColumnChart from '../Charts/ColumnChart';

import LineChart from '../Charts/LineChart';
import SecondaryY_Axis from './secondaryY_Axis/SecondaryY_Axis';

const Chart = (props) => {
    const {listObjData} = props;
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [legend, setLegend] = useState([]);
    const [smallMultiples, setSmallMultiples] = useState([]);
    const [values, setValues] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [secondaryY_Axis, setSecondaryY_Axis] = useState([]);
    const [typeChart, setTypeChart] = useState('');

    const [isActive, setIsActive] = useState(true);

    const [activeNameChart, setActiveNameChart] = useState(true);

 
    
    // ====== Get Chart from Chart Items ========
    const handlerTypeChart = (typeChart)=> {
      setTypeChart(typeChart);
      setXAxis([]);
      setYAxis([]);
      setLegend([]);
      setSmallMultiples([]);
      setValues([]);
      setSizes([]);
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
      const data = smallMultiples.filter((item) => item !== e)
      setSmallMultiples(data);
    }

          //  ====== Value =====
          const handlerValues = (id) => {
            if(values.includes(id) === true) {
              return;
            }
            setValues(pre => [...pre, id])
          }
      
          const drop_handler_Values = (e) => {
            e.preventDefault();
            e.currentTarget.style.background = "lightblue";
            const id = e.dataTransfer.getData("text");
            handlerValues(id);
            if (id == "src_move" && e.target.id == "dest_move"){
              e.target.appendChild(document.getElementById(id));
              if (id == "src_copy" && e.target.id == "dest_copy") {
                var nodeCopy = document.getElementById(id).cloneNode(true);
                nodeCopy.id = "newId";
                e.target.appendChild(nodeCopy);
            }
          }
        }
      
        const handleDeletedValue = (e) => {
          const data = values.filter((item) => item !== e)
          setValues(data);
        }

        //  ====== Size =====
        const handlerSizes = (id) => {
          if(sizes.includes(id) === true) {
            return;
          }
          setSizes(pre => [...pre, id])
        }
    
        const drop_handler_sizes = (e) => {
          e.preventDefault();
          e.currentTarget.style.background = "lightblue";
          const id = e.dataTransfer.getData("text");
          handlerSizes(id);
          if (id == "src_move" && e.target.id == "dest_move"){
            e.target.appendChild(document.getElementById(id));
            if (id == "src_copy" && e.target.id == "dest_copy") {
              var nodeCopy = document.getElementById(id).cloneNode(true);
              nodeCopy.id = "newId";
              e.target.appendChild(nodeCopy);
          }
        }
      }
    
      const handleDeletedSize = (e) => {
        const data = sizes.filter((item) => item !== e)
        setSizes(data);
      }

      //  ====== Secondary Y Axis =====
              const handlerSecondaryY_Axis = (id) => {
                if(secondaryY_Axis.includes(id) === true) {
                  return;
                }
                setSecondaryY_Axis(pre => [...pre, id])
              }
          
              const drop_handler_SecondaryY_Axis = (e) => {
                e.preventDefault();
                e.currentTarget.style.background = "lightblue";
                const id = e.dataTransfer.getData("text");
                handlerSecondaryY_Axis(id);
                if (id == "src_move" && e.target.id == "dest_move"){
                  e.target.appendChild(document.getElementById(id));
                  if (id == "src_copy" && e.target.id == "dest_copy") {
                    var nodeCopy = document.getElementById(id).cloneNode(true);
                    nodeCopy.id = "newId";
                    e.target.appendChild(nodeCopy);
                }
              }
            }
          
            const handleDeletedSecondaryY_Axis = (e) => {
              const data = secondaryY_Axis.filter((item) => item !== e)
              setSecondaryY_Axis(data);
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
    // e.target.style.border = "solid gray";
    e.dataTransfer.clearData();
  }

  // ======================
  const handleShow = () => {
    setIsActive(!isActive)
  }


  const handleShowName = () => {
    setActiveNameChart(!activeNameChart)
  }

  return (
    <>
        <div className='chart_container'>
          {/* ======== left ========= */}
             <div className='chart_title'>
               {/* ======= Name of dataset and filter ====== */}
                <div className= {isActive ? 'chart_columns' : 'chart_columns hidden'}> 
                  {/* Name of dataset */}
                  <DataColumns
                    nameData = {props.nameData}
                    handleShow = {() => handleShow()}
                    columns={props.columns}
                    dragstart_handler = {dragstart_handler}
                    dragend_handler = {dragend_handler}
                  />
                </div>
                {/* ------- display and hidden ------- */}
                <div className={isActive === false ? 'chart_column_small' : 'chart_column_small hidden'}>
                  <div className='small_icon'>
                    <AiOutlineDoubleRight onClick={handleShow}/>
                  </div>
                  <span className='rotate'>Name of dataset</span>
                </div>
                {/* ======== Name of chart and Axis ========= */}
                <div className={activeNameChart ? 'chart_names' : 'chart_names hidden' } >
                  <ChartItems
                     getTypeChart = {handlerTypeChart}
                     handleShowName = {() => handleShowName()}
                  />
                  {/* ===== Axis ====== */}
                  <div className='chart_axis'>
                      <div className='axis_container'>
                            {/* === X === */}
                            {typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ? 
                              <Xaxis 
                                xAxis={xAxis} 
                                drop_handler_xAxis={drop_handler_xAxis} 
                                dragover_handler={dragover_handler}
                                handleDeletedXAxis = {handleDeletedXAxis}
                              /> : (null)
                            }
                            {/* === Y === */}
                            {typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ? 
                              <Yaxis
                                yAxis={yAxis} 
                                drop_handler_YAxis={drop_handler_YAxis} 
                                dragover_handler={dragover_handler}
                                handleDeletedYAxis = {handleDeletedYAxis}
                              /> : (null)
                            }
                            {/* === Legend === */}
                            {typeChart === 'pie' || typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area'|| typeChart === 'donut' ? 
                              <Legend
                                legend={legend} 
                                drop_handler_legend={drop_handler_legend} 
                                dragover_handler={dragover_handler}
                                handleDeletedLegend = {handleDeletedLegend}
                              /> : (null)
                            }
                            {/* === SmallMultiples === */}
                            {typeChart === 'bar' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ? 
                                <SmallMultiples
                                  smallMultiples = {smallMultiples}
                                  drop_handler_smallMultiples = {drop_handler_smallMultiples}
                                  dragover_handler = {dragover_handler}
                                  handleDeletedSmallMultiples = {handleDeletedSmallMultiples}
                              />
                              : (null)}
                            {/* === Value === */}
                            {typeChart === 'pie' || typeChart === '' || typeChart === 'scatter'|| typeChart === 'donut'  ?
                                <Value
                                  values = {values}
                                  drop_handler_Values = {drop_handler_Values}
                                  dragover_handler = {dragover_handler}
                                  handleDeletedValue = {handleDeletedValue}
                                />
                                : (null)
                            }
                            {/* === Size === */}
                            {typeChart === 'scatter' ? 
                                <Size
                                  sizes = {sizes}
                                  drop_handler_sizes = {drop_handler_sizes}
                                  dragover_handler = {dragover_handler}
                                  handleDeletedSize = {handleDeletedSize}
                                /> 
                                : (null)
                            }
                            {/* === Secondary === */}
                            {typeChart === 'area' ? 
                                <SecondaryY_Axis
                                  secondaryY_Axis = {secondaryY_Axis}
                                  drop_handler_SecondaryY_Axis = {drop_handler_SecondaryY_Axis}
                                  dragover_handler = {dragover_handler}
                                  handleDeletedSecondaryY_Axis = {handleDeletedSecondaryY_Axis}
                                /> 
                                : (null)
                            }
                            
                      </div>
                  </div>
                </div>
                {/* ------- display and hidden ------- */}
                <div className={activeNameChart === false ? 'chart_name_small' : 'chart_name_small hidden'}>
                  <div className='small_icon'>
                    <AiOutlineDoubleRight  onClick={handleShowName}/>
                  </div>
                  <span className='rotate'>Visualization</span>
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