import React, { useState } from "react";

import "./chart.css";
import ChartItems from "../ChartItems/ChartItems";
import ChartFields from "../ChartFields/ChartFields";
import DataColumns from "../dataColumns/DataColumns";
import ChartDraw from "../ChartDraw/ChartDraw";
import UnShowNameDatasets from "../UnShowComponents/UnShowNameDatasets";
import UnShowVisualize from "../UnShowComponents/UnShowVisualize";

const ChartTest = (props) => {
  const [selectedChart, setSelectedChart] = useState("");
  const [listChart, setListChart] = useState([]);
  const [listField, setListField] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const [activeNameChart, setActiveNameChart] = useState(true);

  const initialField = {
    xAxis: [],
    yAxis: [],
    legend: [],
    smallMultiples: [],
    values: [],
    sizes: [],
    secondaryY_Axis: [],
  };

  console.log(listChart);
  // handle delete chart
  const handleDeleteChart = (type, index) => {
    const listChartDeleted = listChart.filter((chart) => chart.type !== type);
    setListChart(listChartDeleted);
    setListField((listField[index] = []));
  };

  // isAdd = true => add
  // isAdd = false => remove
  const onGetFields = (attribute, isAdd) => {
    // add a attribute to a list fields of a chart
    const { index } = selectedChart;
    const key = Object.keys(attribute)[0];
    const value = Object.values(attribute)[0];

    if (index >= 0) {
      if (isAdd) {
        setListField((prev) => {
          let field = prev[index];
          if (field[key]) {
            if (!field[key].includes(value)) field[key].push(value);
          } else field[key] = [value];
          return [...prev.slice(0, index), field, ...prev.slice(index + 1)];
        });
      } else {
        setListField((prev) => {
          let field = prev[index];
          if (field[key]) {
            field[key] = field[key].filter((item) => item !== value);
          } else field[key] = [];
          return [...prev.slice(0, index), field, ...prev.slice(index + 1)];
        });
      }
    }
  };

  // ====== Get Chart from Chart Items ========
  const handlerTypeChart = (typeChart) => {
    if (selectedChart.index >= 0) {
      setListChart((prev) => {
        prev[selectedChart.index].type = typeChart;
        return prev;
      });
      setListField((prev) => [
        ...prev.slice(0, selectedChart.index),
        {},
        prev.slice(selectedChart.index + 1),
      ]);
    } else {
      setListChart((prev) => [...prev, { type: typeChart }]);
      setListField((prev) => [...prev, {}]);
    }
  };

  const selectChartHandler = (indexSelected, typeselected) => {
    if (selectedChart.index === indexSelected) {
      setSelectedChart({});
    } else
      setSelectedChart((prev) => ({
        ...prev,
        index: indexSelected,
        type: typeselected,
      }));
  };

  // ========= Drag - Drop =========
  const dragstart_handler = (e, column) => {
    e.dataTransfer.setData("text", column);
    e.effectAllowed = "copyMove";
  };

  const dragend_handler = (e) => {
    e.target.style.border = "solid gray";
    e.dataTransfer.clearData();
  };

  const handleShow = () => {
    setIsActive(!isActive);
  };

  const handleShowName = () => {
    setActiveNameChart(!activeNameChart);
  };

  return (
    <>
      <div className="chart_container">
        {/* ======== left ========= */}
        <div className="chart_title">
          {/* ======= Name of dataset and filter ====== */}
          <div className={isActive ? "chart_columns" : "chart_columns hidden"}>
            {/* Name of dataset */}
            <DataColumns
              handleShow={() => handleShow()}
              columns={props.columns}
              dragstart_handler={dragstart_handler}
              dragend_handler={dragend_handler}
            />
          </div>
          {/* ========== Hanlde Display Name of dataset and filter ========= */}
          <div
            className={
              isActive === false
                ? "chart_column_small"
                : "chart_column_small hidden"
            }
          >
            <UnShowNameDatasets handleShow={() => handleShow()} />
          </div>
          {/* ======== Name of chart and Axis ========= */}
          <div
            className={activeNameChart ? "chart_names" : "chart_names hidden"}
          >
            <ChartItems
              handleShowName={() => handleShowName()}
              getTypeChart={handlerTypeChart}
            />
            {/* ===== Axis ====== */}
            <ChartFields
              typeChart={selectedChart.type}
              getFields={onGetFields}
              fields={
                listField[selectedChart.index]
                  ? listField[selectedChart.index]
                  : {}
              }
            ></ChartFields>
          </div>
          {/* === undisplay visualized === */}
          <div
            className={
              activeNameChart === false
                ? "chart_name_small"
                : "chart_name_small hidden"
            }
          >
            <UnShowVisualize handleShowName={() => handleShowName()} />
          </div>
        </div>
        {/* ====== right ========= */}
        <ChartDraw
          handleDeleteChart={handleDeleteChart}
          selectChartHandler={selectChartHandler}
          selectChart={selectedChart}
          listChart={listChart}
          data={props.listObjData}
          listField={listField}
        ></ChartDraw>
      </div>
    </>
  );
};

export default ChartTest;
