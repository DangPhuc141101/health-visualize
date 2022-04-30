import React from 'react';
import { ListGroup, Dropdown, InputGroup, FormControl} from 'react-bootstrap';
import Draggable from 'react-draggable';
import { AiOutlineDotChart } from 'react-icons/ai';
import { BsBarChart } from 'react-icons/bs';
import { FcLineChart, FcPieChart } from 'react-icons/fc';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { RiBarChartGroupedFill, RiBarChartHorizontalFill, RiBarChartHorizontalLine } from 'react-icons/ri';
import DropFile from '../DropFile/DropFile';
import './chart.css';

const Chart = (props) => {
    console.log(props.data);
    console.log(props.columns);
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
                      {props.columns.map((e) => (
                      <Draggable>
                          <ListGroup>
                                <ListGroup.Item>{e}</ListGroup.Item>
                          </ListGroup>
                      </Draggable>
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
                            <DropFile/>
                            {/* === Y === */}
                            <InputGroup.Text id="basic-addon2">Y-Axis</InputGroup.Text>
                            <DropFile/>
                            {/* === Legend === */}
                            <InputGroup.Text id="basic-addon3">Legend</InputGroup.Text>
                            <DropFile/>
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