import React, { useState } from 'react';
import { Dropdown, InputGroup, ListGroup } from 'react-bootstrap';
import { AiOutlineDotChart } from 'react-icons/ai';
import { BsBarChart } from 'react-icons/bs';
import { FcLineChart, FcPieChart } from 'react-icons/fc';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { RiBarChartGroupedFill, RiBarChartHorizontalFill, RiBarChartHorizontalLine } from 'react-icons/ri';
import './chart.css';

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
    e.target.style.border = "solid black";
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
                  <div className='chart_datasets'>
                    <div className='dataset_title'>
                       <IoMdArrowDropdownCircle/>
                       <span>Name of datasets</span>
                    </div>
                    <div className='dataset_list'>
                        {props.columns.map((column) => (
                          // <Draggable>
                          //     <ListGroup>
                          //       {/* {console.log(typeof e)} */}
                          //           <ListGroup.Item>{e}</ListGroup.Item>
                          //     </ListGroup>
                          // </Draggable>
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
                  {/* Filter */}
                  <div className='chart_filters'>
                    <p>Filter</p>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                          Filter
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                          <Dropdown.Item href="#/action-1" active>Sum</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Average</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Min</Dropdown.Item>
                          <Dropdown.Item href="#/action-4">Max</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                {/* ======== Name of chart and Axis ========= */}
                <div className='chart_names'>
                  {/* ===== Charts ====== */}
                  <div className='chart_items'>
                      <div className='items_container'>
                        <div className='item'>
                          <BsBarChart/>
                          <span>Column Chart</span>
                        </div>
                        <div className='item'>
                          <RiBarChartGroupedFill/>
                          <span>Grouped Col</span>
                        </div>
                        <div className='item'>
                          <MdOutlineStackedBarChart/>
                          <span>Stacked Col</span>
                        </div>
                        <div className='item'>
                          <RiBarChartHorizontalFill/>
                          <span>Bar Chart</span>
                        </div>
                        <div className='item'>
                          <RiBarChartHorizontalLine/>
                          <span>Grouped Chart</span>
                        </div>
                        <div className='item'>
                          <RiBarChartHorizontalLine/>
                          <span>Stacked Chart</span>
                        </div>
                        <div className='item'>
                          <AiOutlineDotChart/>
                          <span>Scatter</span>
                        </div>
                        <div className='item'>
                          <FcPieChart/>
                          <span>Pie Chart</span>
                        </div>
                        <div className='item'>
                          <FcLineChart/>
                          <span>Line Chart</span>
                        </div>
                      </div>
                  </div>
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
                                      {xAxis.map((e) =>
                                        <ul>
                                          <li>{e}</li>
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
                                          <li>{e}</li>
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
                                          <li>{e}</li>
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