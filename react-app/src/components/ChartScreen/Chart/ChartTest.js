import React, { useState } from 'react';

import './chart.css';
import ChartItems from '../ChartItems/ChartItems';
import ChartFields from '../ChartFields/ChartFields';
import DataColumns from '../dataColumns/DataColumns';
import ChartDraw from '../ChartDraw/ChartDraw';

const ChartTest = (props) => {
  const [selectedChart, setSelectedChart] = useState('');
  const [listChart, setListChart] = useState([]);
  const [listField, setListField] = useState([]);
  const initialField = {xAxis:[], yAxis:[], legend:[], smallMultiples:[], values:[], sizes:[], secondaryY_Axis:[]};

  console.log(listChart)
  console.log(listField)
  console.log(listField[0])

  // handle delete chart 
  const handleDeleteChart = (type,index) => {
    console.log('parent type: ', type)
    console.log('parent index: ', index)
    const listChartDeleted = listChart.filter((chart) => chart.type !== type)
    setListChart(listChartDeleted)
    setListField(listField[index] = [])
  }

  // isAdd = true => add
  // isAdd = false => remove
  const onGetFields = (attribute, isAdd)=>{
    // add a attribute to a list fields of a chart   
    const {index} = selectedChart;  
    console.log('index', index)
    const key = Object.keys(attribute)[0];
    console.log(key)
    const value = Object.values(attribute)[0]; 
    console.log(value)     
     
    if (index >=0){
      if (isAdd) {
        setListField((prev)=>{
          let field = prev[index];
          console.log('pre', prev[index])
          console.log(field)
          if (field[key]) {
            if (!field[key].includes(value)) field[key].push(value);
          }
          else field[key] = [value];
          return [...prev.slice(0,index), field, ...prev.slice(index+1)];
        })
      }
      else {
        setListField((prev)=>{
          let field = prev[index];
          if (field[key]) {
            field[key] = field[key].filter(item => item !== value);
          }
          else field[key] = [];
          return [...prev.slice(0,index), field, ...prev.slice(index+1)];
        })
      }
    }
  }

  // ====== Get Chart from Chart Items ========
  const handlerTypeChart = (typeChart) => {
    if (selectedChart.index >= 0){
      setListChart((prev)=>{
        prev[selectedChart.index].type = typeChart;
        return prev;
      })
      setListField((prev)=>[...prev.slice(0,selectedChart.index), {}, prev.slice(selectedChart.index+1)]);
    }
    else {
      setListChart((prev)=>[...prev, {type:typeChart}]);
      setListField(prev => [...prev, {}]);
    }
  } 

  const selectChartHandler = (indexSelected, typeselected) => {
      if (selectedChart.index === indexSelected) {
        setSelectedChart({});
      }
      else setSelectedChart((prev) => ({
        ...prev,
        index: indexSelected,
        type: typeselected
      }));
  }
  
  // ========= Drag - Drop =========
  const dragstart_handler = (e, column) => {
    e.dataTransfer.setData("text", column)
    e.effectAllowed = 'copyMove';
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
              dragstart_handler={dragstart_handler}
              dragend_handler={dragend_handler}
            />
          </div>
          {/* ======== Name of chart and Axis ========= */}
          <div className='chart_names'>
            <ChartItems getTypeChart={handlerTypeChart} />
            {/* ===== Axis ====== */}
            <ChartFields typeChart={selectedChart.type} getFields={onGetFields} fields={(listField[selectedChart.index] ? listField[selectedChart.index] : {})}></ChartFields>
          </div>
        </div>
        {/* ====== right ========= */}
        <ChartDraw handleDeleteChart= {handleDeleteChart} selectChartHandler={selectChartHandler} selectChart={selectedChart} listChart={listChart} data={props.listObjData} listField={listField}></ChartDraw>
      </div>
    </>
  )
}

export default ChartTest;