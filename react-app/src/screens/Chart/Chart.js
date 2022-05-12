import React, { useState } from 'react';
import { InputGroup, ListGroup } from 'react-bootstrap';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import './chart.css';
import ChartItems from './ChartItems/ChartItems';

const Chart = (props) => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [legend, setLegend] = useState([]);
    
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

  const handleClickDown = (e) => {
    console.log('check', e)
  }


  return (
    <>
        <div className='chart_container'>
          {/* ======== left ========= */}
             <div className='chart_title'>
               {/* ======= Name of dataset and filter ====== */}
                <div className='chart_columns'>
                  {/* Name of dataset */}
                  <div className='chart_datasets'>
                    <div className='dataset_title'>
                       <IoMdArrowDropdownCircle/>
                       <span>Name of datasets</span>
                    </div>
                    <div className='dataset_list'>
                        {props.columns.map((column) => (
                          <div 
                            draggable='true' 
                            id='src_copy' 
                            onDragStart={(e) => dragstart_handler(e,column)}
                            onDragEnd={(e) => dragend_handler(e)}>
                              <ListGroup>
                                <ListGroup.Item>{column}</ListGroup.Item>
                              </ListGroup>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                </div>
                {/* ======== Name of chart and Axis ========= */}
                <div className='chart_names'>
                  <ChartItems/>
                  {/* ===== Axis ====== */}
                  <div className='chart_axis'>
                      <div className='axis_container'>
                            {/* === X === */}
                            <InputGroup.Text id="basic-addon1">X-Axis</InputGroup.Text>
                            <div 
                              id='dest_copy' 
                              onDrop={(e) => drop_handler_xAxis(e)} 
                              onDragOver={(e) => dragover_handler(e)}
                              className='x_Axis'
                            >
                              {xAxis != 0 ? 
                                      <div>
                                      {xAxis.map((e, index) =>
                                        <ul>
                                          <li className='column_items'>
                                            <div className='column_name'>
                                              {e}
                                            </div>
                                            <div className='column_icons'>
                                              <RiArrowDropDownLine onClick={() => handleClickDown(e)}/>
                                              <TiDeleteOutline onClick={() => handleDeletedXAxis(e)}/>
                                            </div>
                                          </li>
                                        </ul>
                                      )}
                                      </div> 
                                      : 
                                      <p>Drop here</p>}
                            </div>
                            {/* === Y === */}
                            <InputGroup.Text id="basic-addon2">Y-Axis</InputGroup.Text>
                            <div 
                              id='dest_copy' 
                              onDrop={(e) => drop_handler_YAxis(e)} 
                              onDragOver={(e) => dragover_handler(e)}
                              className='y_Axis'
                            >
                              {yAxis != 0 ? 
                                      <div>
                                      {yAxis.map((e) =>
                                        <ul>
                                          <li className='column_items'>
                                            <div className='column_name'>
                                              {e}
                                            </div>
                                            <div>
                                              <RiArrowDropDownLine/>
                                              <TiDeleteOutline onClick={() => handleDeletedYAxis(e)}/>
                                            </div>
                                          </li>
                                        </ul>
                                      )}
                                      </div> 
                                      : 
                                      <p>Drop here</p>}
                            </div>
                            {/* === Legend === */}
                            <InputGroup.Text id="basic-addon3">Legend</InputGroup.Text>
                            <div 
                              id='dest_copy' 
                              onDrop={(e) => drop_handler_legend(e)} 
                              onDragOver={(e) => dragover_handler(e)}
                              className='legend'
                            >
                              {legend != 0 ? 
                                      <div>
                                      {legend.map((e) =>
                                        <ul>
                                          <li className='column_items'>
                                            <div className='column_name'>
                                              {e}
                                            </div>
                                            <div>
                                              <RiArrowDropDownLine/>
                                              <TiDeleteOutline onClick={() => handleDeletedLegend(e)}/>
                                            </div>
                                          </li>
                                        </ul>
                                      )}
                                      </div> 
                                      : 
                                      <p>Drop here</p>}
                            </div>
                      </div>
                  </div>
                </div>
              </div>
              {/* ====== right ========= */}
            <div className='chart_draw'>
                  right
            </div>
        </div>
    </>
  )
}

export default Chart