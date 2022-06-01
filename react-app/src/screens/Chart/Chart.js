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


const Chart = (props) => {
    const {listObjData} = props;
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [legend, setLegend] = useState([]);
    const [smallMultiples, setSmallMultiples] = useState([]);
    const [values, setValues] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [typeChart, setTypeChart] = useState('');
    
    // ====== Get Chart from Chart Items ========
    const handlerTypeChart = (typeChart)=> {
      setTypeChart(typeChart);
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
                            {typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' ? 
                              <Xaxis 
                              xAxis={xAxis} 
                              drop_handler_xAxis={drop_handler_xAxis} 
                              dragover_handler={dragover_handler}
                              handleDeletedXAxis = {handleDeletedXAxis}
                              /> : (null)
                            }
                            {/* === Y === */}
                            {typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' ? 
                              <Yaxis
                                yAxis={yAxis} 
                                drop_handler_YAxis={drop_handler_YAxis} 
                                dragover_handler={dragover_handler}
                                handleDeletedYAxis = {handleDeletedYAxis}
                              /> : (null)
                            }
                            {/* === Legend === */}
                            {typeChart === 'pie' || typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' ? 
                              <Legend
                                legend={legend} 
                                drop_handler_legend={drop_handler_legend} 
                                dragover_handler={dragover_handler}
                                handleDeletedLegend = {handleDeletedLegend}
                              /> : (null)
                            }
                            {/* === SmallMultiples === */}
                            {typeChart === 'bar' || typeChart === 'line' ? 
                                <SmallMultiples
                                  smallMultiples = {smallMultiples}
                                  drop_handler_smallMultiples = {drop_handler_smallMultiples}
                                  dragover_handler = {dragover_handler}
                                  handleDeletedSmallMultiples = {handleDeletedSmallMultiples}
                              />
                              : (null)}
                            {/* === Value === */}
                            {typeChart === 'pie' || typeChart === '' || typeChart === 'scatter' ?
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