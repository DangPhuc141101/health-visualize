import React, { useState } from 'react';

import Xaxis from '../ChartField/xAxis/Xaxis';
import Yaxis from '../ChartField/yAxis/Yaxis';
import Value from '../ChartField/value/Value';
import Legend from '../ChartField/legend/Legend';
import SmallMultiples from '../ChartField/smallMultiples/SmallMultiples';
import SecondaryY_Axis from '../ChartField/secondaryY_Axis/SecondaryY_Axis';
import Size from '../ChartField/size/Size';

const ChartFields = (props) => {
  const {xAxis, yAxis, legend, smallMultiples, values, sizes, secondaryY_Axis} = props.fields;
  const { typeChart } = props;
 
  //  ====== X-Axis =====
  const handlerXAxis = (field) => {
    props.getFields({xAxis: field}, true);
  }

  const dragover_handler = (e) => {
    e.preventDefault();
  }

  // ===== support drop handler ====
  const supportHandler = (e, id) => {
    e.currentTarget.style.background = "lightblue";
    if (id == "src_move" && e.target.id == "dest_move") {
      e.target.appendChild(document.getElementById(id));
      if (id == "src_copy" && e.target.id == "dest_copy") {
        var nodeCopy = document.getElementById(id).cloneNode(true);
        nodeCopy.id = "newId";
        e.target.appendChild(nodeCopy);
      }
    }
  }

  const drop_handler_xAxis = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerXAxis(id);
    supportHandler(e, id);
  }

  const handleDeletedXAxis = (field) => {
    props.getFields({xAxis: field}, false);
  }

  // ====== Y-Axis =====
  const handlerYAxis = (field) => {
    props.getFields({yAxis: field}, true);
  }

  const drop_handler_YAxis = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerYAxis(id);
    supportHandler(e, id);
  }

  const handleDeletedYAxis = (field) => {
    props.getFields({yAxis: field}, false);
  }

  // ====== Legend =====
  const handlerLegend = (field) => {
    props.getFields({legend: field}, true);
  }

  const drop_handler_legend = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerLegend(id);
    supportHandler(e, id);
  }

  const handleDeletedLegend = (field) => {
    props.getFields({legend: field});
  }

  //  ====== Small Multiples =====
  const handlerSmallMultiples = (field) => {
    props.getFields({smallMultiples: field}, true);
  }

  const drop_handler_smallMultiples = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerSmallMultiples(id);
    supportHandler(e, id);
  }

  const handleDeletedSmallMultiples = (field) => {
    props.getFields({smallMultiples: field}, false);
  }

  //  ====== Value =====
  const handlerValues = (field) => {
    props.getFields({values: field}, true);
  }

  const drop_handler_Values = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerValues(id);
    supportHandler(e, id);
  }

  const handleDeletedValue = (field) => {
    props.getFields({values: field}, false);
  }

  //  ====== Size =====
  const handlerSizes = (field) => {
    props.getFields({sizes: field}, true);
  }

  const drop_handler_sizes = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerSizes(id);
    supportHandler(e, id);
  }

  const handleDeletedSize = (field) => {
    props.getFields({sizes: field}, false);
  }

  //  ====== Secondary Y Axis =====
  const handlerSecondaryY_Axis = (field) => {
    props.getFields({secondaryY_Axis: field}, true);
  }

  const drop_handler_SecondaryY_Axis = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    handlerSecondaryY_Axis(id);
    supportHandler(e, id);
  }

  const handleDeletedSecondaryY_Axis = (field) => {
    props.getFields({secondaryY_Axis: field}, false);
  }

  return (
    <div className='chart_axis'>
      <div className='axis_container'>
        {/* === X === */}
        {typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ?
          <Xaxis
            xAxis={(xAxis ? xAxis : [])}
            drop_handler_xAxis={drop_handler_xAxis}
            dragover_handler={dragover_handler}
            handleDeletedXAxis={handleDeletedXAxis}
          /> : (null)
        }
        {/* === Y === */}
        {typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ?
          <Yaxis
            yAxis={(yAxis ? yAxis : [])}
            drop_handler_YAxis={drop_handler_YAxis}
            dragover_handler={dragover_handler}
            handleDeletedYAxis={handleDeletedYAxis}
          /> : (null)
        }
        {/* === Legend === */}
        {typeChart === 'pie' || typeChart === 'bar' || typeChart === 'scatter' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ?
          <Legend
            legend={(legend ? legend : [])}
            drop_handler_legend={drop_handler_legend}
            dragover_handler={dragover_handler}
            handleDeletedLegend={handleDeletedLegend}
          /> : (null)
        }
        {/* === SmallMultiples === */}
        {typeChart === 'bar' || typeChart === 'line' || typeChart === 'column' || typeChart === 'area' ?
          <SmallMultiples
            smallMultiples={(smallMultiples ? smallMultiples : [])}
            drop_handler_smallMultiples={drop_handler_smallMultiples}
            dragover_handler={dragover_handler}
            handleDeletedSmallMultiples={handleDeletedSmallMultiples}
          />
          : (null)}
        {/* === Value === */}
        {typeChart === 'pie' || typeChart === '' || typeChart === 'scatter' ?
          <Value
            values={(values ? values : [])}
            drop_handler_Values={drop_handler_Values}
            dragover_handler={dragover_handler}
            handleDeletedValue={handleDeletedValue}
          />
          : (null)
        }
        {/* === Size === */}
        {typeChart === 'scatter' ?
          <Size
            sizes={(sizes ? sizes : [])}
            drop_handler_sizes={drop_handler_sizes}
            dragover_handler={dragover_handler}
            handleDeletedSize={handleDeletedSize}
          />
          : (null)
        }
        {/* === Secondary === */}
        {typeChart === 'area' ?
          <SecondaryY_Axis
            secondaryY_Axis={(secondaryY_Axis ? secondaryY_Axis : [])}
            drop_handler_SecondaryY_Axis={drop_handler_SecondaryY_Axis}
            dragover_handler={dragover_handler}
            handleDeletedSecondaryY_Axis={handleDeletedSecondaryY_Axis}
          />
          : (null)
        }
      </div>
    </div>
  );
}
export default ChartFields;