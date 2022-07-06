import React, { useEffect, useRef, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import Features from '../../features/Features';

const Yaxis = (props) => {
  const [isActive, setIsActive] = useState(-1);
  const [nameRadio, setNameRadio] = useState([]);

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
            // if(!chartMenu.current.contains(e.target.value)) {
            //     setIsActive(false)
            // }
        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    const callbackFunction = (childData, index) => {
      setNameRadio(pre => {
        const names = [...pre];
        names[index] = childData + ' of '
        return names;
      });
   }

    const handleDeleted = (e, index) => {
      props.handleDeletedYAxis(e);
    }

  return (
    <div>
    <InputGroup.Text id="basic-addon2">Y-Axis</InputGroup.Text>
        <div 
        id='dest_copy' 
        onDrop={(e) => props.drop_handler_YAxis(e)} 
        onDragOver={(e) => props.dragover_handler(e)}
        className='y_Axis'
        >
        {props.yAxis != 0 ? 
                <div>
                {props.yAxis.map((e, index) =>
                    <ul>
                    <li className='column_items'>
                        <div className='column_name'>
                        {`${(nameRadio[index]) ? nameRadio[index] : ''} ${e}`}
                        </div>
                        <div className='column_icons' ref={chartMenu}>
                          <RiArrowDropDownLine onClick={() => handleClickDown(e,index)}/>
                            <div className={isActive === index ? 'hidden' : 'active'}>
                                <Features index = {index} parentCallBack = {callbackFunction}/>
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

export default Yaxis