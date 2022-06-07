import React from 'react'
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { InputGroup, ListGroup } from 'react-bootstrap';

const DataColumns = (props) => {


  return (
    <div>
        <div className='chart_datasets'>
            <div className='dataset_title'
                draggable = 'false'
            >
                <div className='dataset_Name'>
                    <IoMdArrowDropdownCircle/>
                    <span>Name of datasets</span>
                </div>

                <button class="dataSet_icons">
                    <AiOutlineDoubleLeft onClick={(e) => props.handleShow(e)}/>
                   
                </button>
            </div>
            <div className='dataset_list'>
                {props.columns.map((column) => (
                <div 
                    draggable='true' 
                    id='src_copy' 
                    onDragStart={(e) => props.dragstart_handler(e,column)}
                    onDragEnd={(e) => props.dragend_handler(e)}>
                    <ListGroup>
                        <ListGroup.Item>{column}</ListGroup.Item>
                    </ListGroup>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DataColumns