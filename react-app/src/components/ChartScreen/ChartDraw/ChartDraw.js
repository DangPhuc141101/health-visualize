import React, {useState, useEffect} from "react";

import Wrapper from "../../Charts/Wrapper"

const ChartDraw = (props) => {
    const {selectChart, listChart, listField} = props;
   
    return(
        <div className='chart_draw'>
         { (listChart.length  > 0) ? listChart.map((chart, i) => {
            return (<Wrapper onClickWrapper={props.selectChartHandler} index={i} type={chart.type} data={props.data} fields={listField[i]}></Wrapper>)
          }) : null}
        </div>
    );
}

export default ChartDraw;