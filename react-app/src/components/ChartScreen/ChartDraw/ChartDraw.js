import React, { useState, useEffect } from "react";

import Wrapper from "../../Charts/Wrapper";

const ChartDraw = (props) => {
  const { selectChart, listChart, listField, handleDeleteChart } = props;

  return (
    <div className="chart_draw">
      {listChart.length > 0
        ? listChart.map((chart, i) => {
            return (
              <Wrapper
                key={i}
                onClickWrapper={props.selectChartHandler}
                index={i}
                type={chart.type}
                data={props.data}
                fields={listField[i]}
                listChart={props.listChart}
                handleDeleteChart={props.handleDeleteChart}
              ></Wrapper>
            );
          })
        : null}
    </div>
  );
};

export default ChartDraw;
