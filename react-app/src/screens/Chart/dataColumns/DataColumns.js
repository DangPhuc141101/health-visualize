import React, {useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineDoubleLeft, AiOutlineDown } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';
import { IoIosArrowUp, IoMdArrowDropdownCircle } from 'react-icons/io';
import './dataColumns.css';

const DataColumns = (props) => {

    const [isActive, setIsActive] = useState(-1);
    const [valueIndex, setValueIndex] = useState();

    const handleChange = (index) => {
        if(isActive === index) {
            setIsActive(-1)
        } else {
            setIsActive(index)
        }
        setValueIndex(index)
    }

    const handleClick = () => {
        const hi = document.getElementsByClassName('data_container').style.border = "1px solid black"
        return hi;
    }

    const handleSaveIndex = (i) => {
        // setValueIndex(i);
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
            {props.nameData.map((name, i) => (
                <div className={isActive === i ? 'data_container' : 'data_container active'} onChange={handleSaveIndex(i)}>
                    <div className='data_ListContainer'>
                        <div>
                            <h6 className='data_title' key={i}>
                                <BsTable className='title_icon'/>
                                <div className='title_name' onClick={handleClick}>
                                    {name}
                                </div>
                            </h6>
                    
                            <div className='data_list'>
                                {props.columns[i].map((column, j) => (
                                    <div 
                                        draggable='true' 
                                        id='src_copy' 
                                        onDragStart={(e) => props.dragstart_handler(e,column)}
                                        onDragEnd={(e) => props.dragend_handler(e)}>
                                        <ListGroup key={j}>
                                            <ListGroup.Item>{column}</ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                ))}
                            </div>
                            <button className='data_toggle' onClick={() => handleChange(i)}>
                                <AiOutlineDown className='down'/>
                                <IoIosArrowUp className='arrowUp'/>
                            </button>
                        </div>
                    </div>
                </div>    
            ))}
        </div>
        </div>
    </div>
  )
}

export default DataColumns