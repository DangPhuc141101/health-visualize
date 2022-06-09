import React, {useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineDoubleLeft, AiOutlineDown } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';
import { IoIosArrowUp, IoMdArrowDropdownCircle } from 'react-icons/io';
import './dataColumns.css';

const DataColumns = (props) => {

    console.log(props.nameData)
    const [isActive, setIsActive] = useState(false);

    const handleChange = (id) => {
        setIsActive(!isActive)
    }

  return (
    <div>
        <div className='chart_datasets'>
            <div className='dataset_title'
                draggable = 'false'
            >
                <div className='dataset_Name'>
                    <IoMdArrowDropdownCircle/>
                    <span>DataSets</span>
                </div>

                <button className="dataSet_icons">
                    <AiOutlineDoubleLeft onClick={(e) => props.handleShow(e)}/>
                   
                </button>
            </div>
            <div className='dataset_list'>
                <div className={isActive ? 'data_container' : 'data_container active'} >
                    <h6 className='data_title'>
                        <BsTable className='title_icon'/>
                        <div className='title_name'>
                            {props.nameData}
                        </div>
                    </h6>
                    <div className='data_list'>
                        {props.columns.map((column) => (
                            <div 
                                draggable='true' 
                                id='src_copy' 
                                onDragStart={(e) => props.dragstart_handler(e,column)}
                                onDragEnd={(e) => props.dragend_handler(e)}>
                                <ListGroup key={column}>
                                    <ListGroup.Item>{column}</ListGroup.Item>
                                </ListGroup>
                            </div>
                        ))}
                    </div>
                    <button className='data_toggle' onClick={() => handleChange()}>
                        <AiOutlineDown className='down'/>
                        <IoIosArrowUp className='arrowUp'/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DataColumns