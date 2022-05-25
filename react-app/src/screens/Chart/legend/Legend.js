import React, {useEffect, useRef, useState} from 'react'
import { InputGroup, ListGroup } from 'react-bootstrap';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import Features from '../../features/Features';

const Legend = (props) => {
  const [isActive, setIsActive] = useState(-1);
  const [checked, setChecked] = useState('Sum');

  const handleClickDown = (e, index) => {
    if(isActive === index) {
      setIsActive(-1);
    } else {
      setIsActive(index);
    }
  }

  const chartMenu = useRef();

    useEffect(() => {
        let handler = (e) => {
            if(!chartMenu.current.contains(e.target.value)) {
                setIsActive(false)
            }
        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    const callbackFunction = (childData, id) => {
      setChecked(childData)
    }

    const handleDeleted = (e, index) => {
      props.handleDeletedLegend(e);
      if(index === 0) {
        setChecked(' ');
      }
    }

  return (
    <div>
        <InputGroup.Text id="basic-addon3">Legend</InputGroup.Text>
        <div 
        id='dest_copy' 
        onDrop={(e) => props.drop_handler_legend(e)} 
        onDragOver={(e) => props.dragover_handler(e)}
        className='legend'
        >
        {props.legend != 0 ? 
                <div>
                {props.legend.map((e, index) =>
                    <ul>
                    <li className='column_items'>
                        <div className='column_name'>
                          {checked ? `${checked} of ${e}` : {e}}
                        </div>
                        <div className='column_icons' ref={chartMenu}>
                          <RiArrowDropDownLine onClick={() => handleClickDown(e,index)}/>
                          <div className={isActive === index ? 'hidden' : 'active'}>
                                <Features parentCallBack = {callbackFunction}/>
                              </div>
                          <TiDeleteOutline onClick={() => handleDeleted(e, index)}/>
                        </div>
                    </li>
                    </ul>
                )}
                </div> 
                : 
                <p>Drop here</p>}
        </div>
    </div>
  )
}

export default Legend