import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDotChart, AiOutlineDoubleLeft } from "react-icons/ai";
import { BiTable } from "react-icons/bi";
import { BsBarChart } from "react-icons/bs";
import {
  FcLineChart,
  FcPieChart,
  FcAreaChart,
  FcDoughnutChart,
} from "react-icons/fc";
import { MdOutlineStackedBarChart } from "react-icons/md";
import {
  RiBarChartGroupedFill,
  RiBarChartHorizontalFill,
  RiBarChartHorizontalLine,
} from "react-icons/ri";
import "./chartItems.css";

const ChartItems = (props) => {
  const [isActive, setIsActive] = useState(false);

  const chartMenu = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!chartMenu.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const ToggleClass = () => {
    setIsActive(!isActive);
  };

  const clickTable = () => {
    props.getTypeChart("table");
    setIsActive(!isActive);
  };

  const clickColumn = () => {
    props.getTypeChart("column");
    setIsActive(!isActive);
  };

  const clickPie = () => {
    props.getTypeChart("pie");
    setIsActive(!isActive);
  };
  const clickBar = () => {
    props.getTypeChart("bar");
    setIsActive(!isActive);
  };
  const clickStack = () => {
    props.getTypeChart("stack");
    setIsActive(!isActive);
  };
  const clickLine = () => {
    props.getTypeChart("line");
    setIsActive(!isActive);
  };
  const clickScatter = () => {
    props.getTypeChart("scatter");
    setIsActive(!isActive);
  };

  const clickArea = () => {
    props.getTypeChart("area");
    setIsActive(!isActive);
  };

  const clickDonut = () => {
    props.getTypeChart("donut");
    setIsActive(!isActive);
  };
  return (
    <>
      <div className="chartItems_container">
        {/*======= Chart table ========= */}
        <div className="chart_table">
          <button
            type="button"
            className="btn btn-primary"
            id="liveToastBtn"
            onClick={clickTable}
          >
            <BiTable />
            <p>Table</p>
          </button>
        </div>
        {/*======= Chart ========= */}
        <div className="charts" ref={chartMenu}>
          <button
            type="button"
            className="btn btn-primary"
            id="liveToastBtn"
            onClick={ToggleClass}
          >
            <BsBarChart />
            <p>Chart</p>
          </button>
          <div className={isActive ? "hidden" : "active"}>
            <div className="items_container">
              <div className="item" onClick={clickColumn}>
                <BsBarChart />
                <span>Column Chart</span>
              </div>
              <div className="item">
                <RiBarChartGroupedFill />
                <span>Grouped Col</span>
              </div>
              <div className="item" onClick={clickStack}>
                <MdOutlineStackedBarChart />
                <span>Stacked Col</span>
              </div>
              <div className="item" onClick={clickBar}>
                <RiBarChartHorizontalFill />
                <span>Bar Chart</span>
              </div>
              <div className="item">
                <RiBarChartHorizontalLine />
                <span>Grouped Chart</span>
              </div>
              <div className="item">
                <RiBarChartHorizontalLine />
                <span>Stacked Chart</span>
              </div>
              <div className="item" onClick={clickScatter}>
                <AiOutlineDotChart />
                <span>Scatter</span>
              </div>
              <div className="item" onClick={clickPie}>
                <FcPieChart />
                <span>Pie Chart</span>
              </div>
              <div className="item" onClick={clickLine}>
                <FcLineChart />
                <span>Line Chart</span>
              </div>
              <div className="item" onClick={clickArea}>
                <FcAreaChart />
                <span>Area Chart</span>
              </div>
              <div className="item" onClick={clickDonut}>
                <FcDoughnutChart />
                <span>Donut Chart</span>
              </div>
            </div>
          </div>
        </div>
        <div className="icon_chartItems">
          <AiOutlineDoubleLeft onClick={() => props.handleDisplayCompent()} />
        </div>
      </div>
    </>
  );
};

export default ChartItems;
