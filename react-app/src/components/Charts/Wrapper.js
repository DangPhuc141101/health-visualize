import React from 'react';
import { useState, createContext } from 'react';
import { Rnd } from "react-rnd";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import ColumnChart from "./ColumnChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { TiDeleteOutline } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import DeleteChartDetail from "../ChartScreen/features/DeleteChartDetail/DeleteChartDetail";


const Wrapper = (props) => {
    const height = 500, width = 800;
    const { xAxis, yAxis, legend, smallMultiples, values, sizes, secondaryY_Axis } = props.fields;
    const { index, type, fields, listChart } = props;

  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

    const clickWrapperHandler = (e) => {
        props.onClickWrapper(props.index, props.type);
    }

    // -- handle delete Chart --
    const handleDeleteChart = (type, index) => {
        props.handleDeleteChart(type, index);
    }

  // const checkDelete = (type, index) => {
  //   console.log(type);
  // };

  // -- create Chart --
  const createChart = () => {
    try {
      switch (type) {
        case "column":
          return xAxis && yAxis ? (
            <ColumnChart
              data={props?.data}
              smallMultiple={smallMultiples ? smallMultiples[0] : null}
              yAxis={yAxis}
              xAxis={xAxis[0]}
              legend={legend ? legend[0] : null}
            />
          ) : null;
        case "bar":
          return xAxis && yAxis ? (
            <BarChart
              data={props?.data}
              yAxis={yAxis}
              xAxis={xAxis[0]}
              legend={legend ? legend[0] : null}
            />
          ) : null;
        case "pie":
          return values && legend ? (
            <PieChart data={props.data} value={values} legend={legend} />
          ) : null;
        // case 'donut':
        //     return <DonutChart/>
        case "line":
          return xAxis && yAxis ? (
            <LineChart
              yAxis={yAxis}
              xAxis={xAxis[0]}
              data={props?.data}
              legend={legend ? legend[0] : null}
            />
          ) : null;
        case "area":
          return xAxis && yAxis ? (
            <AreaChart data={props?.data} yAxis={yAxis} xAxis={xAxis[0]} />
          ) : null;
        default:
          return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const style = {
    rnd: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 2px #1D81A2",
      borderStyle: "dotted",
      position: "relative",
    },
    legend: {
      title: { fontSize: 20 },
      labels: { fontSize: 12 },
      tooltip: {
        stroke: "grey",
        fill: "white",
        shadowColor: "grey",
        shadowWidth: 5,
      },
    },
    icon: {
      position: "absolute",
      display: "block",
      right: "5px",
      top: "-0px",
      fontSize: "20px",
      cursor: "pointer",
      height: "20px",
      zIndex: "10000000",
    },

    deleteDetail: {
      position: "absolute",
      backgroundColor: "#f0ebe3",
      display: "block",
      borderRadius: "9px",
      zIndex: "10000000",
      top: "0",
    },
  };
  return (
    <Rnd
      onClick={clickWrapperHandler}
      style={style.rnd}
      default={{
        x: 0,
        y: 0,
        width: 400,
        height: 300,
      }}
      bounds={"parent"}
      key={index}
    >
      {/*
    <TiDeleteOutline
    style={style.icon}
    onClick={() => handleDeleteChart(type, index)}
    />
  */}
      <BsThreeDots style={style.icon} onClick={handleActive} />
      {active && (
        <DeleteChartDetail
          style={style.deleteDetail}
          handleDeleteChart={handleDeleteChart}
          handleActive={handleActive}
          type={type}
          index={index}
        />
      )}
      {createChart()}
    </Rnd>
  );
};

export default Wrapper;
