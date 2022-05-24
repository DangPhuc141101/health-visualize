import React, { useEffect, useRef, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import Features from '../../features/Features';

const Xaxis = (props) => {
  const [isActive, setIsActive] = useState(-1);
  const [checked, setChecked] = useState(' ');

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
    props.handleDeletedXAxis(e);
    if(index === 0) {
      setChecked(' ');
    }
  }

  return (
    <div>
        <InputGroup.Text id="basic-addon1">X-Axis</InputGroup.Text>
        <div 
        id='dest_copy' 
        onDrop={(e) => props.drop_handler_xAxis(e)} 
        onDragOver={(e) => props.dragover_handler(e)}
        className='x_Axis'
        >
        {props.xAxis != 0 ? 
                <div>
                  {props.xAxis.map((e, index) =>
                    <ul>
                        <li className='column_items'>
                            <div className='column_name'>
                            {/* */}
                              {checked ? `${checked} of ${e}` : {e}}
                            </div>
                            <div className='column_icons' ref={chartMenu}>
                              <RiArrowDropDownLine 
                                onClick={() => handleClickDown(e,index)}
                              />
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

export default Xaxis