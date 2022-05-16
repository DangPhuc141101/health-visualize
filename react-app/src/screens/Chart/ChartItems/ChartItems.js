import React, {useState} from 'react';
import './chartItems.css'
import { BsBarChart } from 'react-icons/bs';
import { BiTable } from 'react-icons/bi';
import { FcLineChart, FcPieChart } from 'react-icons/fc';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { RiBarChartGroupedFill, RiBarChartHorizontalFill, RiBarChartHorizontalLine } from 'react-icons/ri';
import {TiDeleteOutline} from 'react-icons/ti';
import {AiOutlineDotChart} from 'react-icons/ai'

const ChartItems = (props) => {
    const [isActive, setIsActive] = useState(true);

    const ToggleClass = () => {
        setIsActive(!isActive);
    };

    const clickPie = () => {
       props.getTypeChart('pie');
    }
    const clickBar = () => {
        props.getTypeChart('bar');
     }
     const clickStack = () => {
        props.getTypeChart('stack');
     }
     const clickLine = () => {
        props.getTypeChart('line');
     }
     const clickScatter = () => {
        props.getTypeChart('scatter');
     }
  return (
    <>
        <div className='chartItems_container'>
            {/*======= Chart table ========= */}
            <div className='chart_table'>
                <button type="button" class="btn btn-primary" id="liveToastBtn">
                    <BiTable/>
                    <p>Table</p>
                </button>
            </div>
            {/*======= Chart table ========= */}
            <div className='charts'>
                <button 
                    type="button" 
                    class="btn btn-primary" 
                    id="liveToastBtn"
                    onClick={ToggleClass}
                >
                    <BsBarChart/>
                    <p>Chart</p>
                </button>
                <div className={isActive ? "hidden" : 'active'}>
                    <div className='items_container'>
                        <div className='item'>
                            <BsBarChart/>
                            <span>Column Chart</span>
                        </div>
                        <div className='item'>
                            <RiBarChartGroupedFill/>
                            <span>Grouped Col</span>
                        </div>
                        <div className='item' onClick={clickStack}>
                            <MdOutlineStackedBarChart/>
                            <span>Stacked Col</span>
                        </div>
                        <div className='item' onClick={clickBar}>
                            <RiBarChartHorizontalFill/>
                            <span >Bar Chart</span>
                        </div>
                        <div className='item'>
                            <RiBarChartHorizontalLine/>
                            <span>Grouped Chart</span>
                        </div>
                        <div className='item'>
                            <RiBarChartHorizontalLine/>
                            <span>Stacked Chart</span>
                        </div>
                        <div className='item' onClick={clickScatter}>
                            <AiOutlineDotChart/>
                            <span>Scatter</span>
                        </div>
                        <div className='item' onClick={clickPie}>
                            <FcPieChart/>
                            <span>Pie Chart</span>
                        </div>
                        <div className='item' onClick={clickLine}>
                            <FcLineChart/>
                            <span>Line Chart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ChartItems