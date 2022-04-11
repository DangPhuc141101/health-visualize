import React, { useState, useEffect } from 'react'
import './Visualize.css'
import { VictoryBar, VictoryChart, VictoryHistogram } from 'victory';

const Visualize = (props) => {
    const [columnsSelected, setColumnsSelected] = useState([]);

    const addColumn = (e) => {
        if (e.target.checked) {
            setColumnsSelected((preveColumnsSelected) => [...preveColumnsSelected, e.target.value]);
        }
        else {
            setColumnsSelected((preveColumnsSelected)=> preveColumnsSelected.filter(column => column!==e.target.value) )
        }
    }

    return (
        <div className='container'>
            <div className='main'>
                <div className='main-left'>
                    <div className='main-left-top'>
                        {props.columns ? props.columns.map(column=>(
                            <div>
                                <input type="checkbox" id={column} name={column} value={column} onChange={addColumn}/> <label>{column}</label>
                            </div>
                        )) : <p>Nopthing</p>}
                    </div>
                    <div className='main-left-bottom'> 
                        {columnsSelected ? columnsSelected.map(column => 
                            (<div>
                                <label>{column} </label>
                                <select>
                                    <option>Histogram</option>
                                    <option>Column</option>
                                    <option>Line</option>
                                </select>
                            </div>)) : <p></p>}
                    </div>
                </div>
                <div className='main-right'>
                
                {(props.data && columnsSelected.length>0) ? 
                  (  <VictoryChart
                    // domainPadding={10}
                    >
                    <VictoryHistogram
                        style={{ data: { fill: "#c43a31" } }}
                        data={props.data[columnsSelected[0]].map(element => { return {x : element}})}
                        labels={({ datum }) => `${datum.y}`}
                        x={props.types[columnsSelected[0]] === "object" ? 'x' : ''}
                    />
                    </VictoryChart>)  : (<p></p>)
                }
                </div>
            </div>
        </div>
    );
}

export default Visualize;