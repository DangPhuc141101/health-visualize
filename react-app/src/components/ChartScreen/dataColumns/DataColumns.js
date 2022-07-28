import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiOutlineDoubleLeft, AiOutlineDown } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { IoIosArrowUp, IoMdArrowDropdownCircle } from "react-icons/io";
import "./dataColumns.css";

const DataColumns = (props) => {
  const [isActive, setIsActive] = useState(-1);
  const [valueIndex, setValueIndex] = useState();

  const handleChange = (index) => {
    if (isActive === index) {
      setIsActive(-1);
    } else {
      setIsActive(index);
    }
    setValueIndex(index);
  };

  const handleClick = () => {
    const hi = (document.getElementsByClassName("data_container").style.border =
      "1px solid black");
    return hi;
  };

  return (
    <div>
      <div className="chart_datasets">
        <div className="dataset_title">
          <div className="title_name">
            <IoMdArrowDropdownCircle />
            <span>Name of datasets</span>
          </div>
          <div className="title_icon">
            <AiOutlineDoubleLeft onClick={props.handleShow} />
          </div>
        </div>
        <div className="dataset_list">
          {props.nameData.map((name, i) => (
            <div
              className={
                isActive === i ? "data_container" : "data_container active"
              }
            >
              <div className="data_ListContainer">
                <div key={i}>
                  <h6 className="data_title" key={i}>
                    <BsTable className="title_icon" />
                    <div className="title_name" onClick={handleClick} key={i}>
                      {name}
                    </div>
                  </h6>
                </div>

                <div className="data_list">
                  {props.columns.map((column, index) => (
                    <div
                      draggable="true"
                      id="src_copy"
                      key={index}
                      onDragStart={(e) => props.dragstart_handler(e, column)}
                      onDragEnd={(e) => props.dragend_handler(e)}
                    >
                      <ListGroup key={index}>
                        <ListGroup.Item>{column}</ListGroup.Item>
                      </ListGroup>
                    </div>
                  ))}
                </div>
                <button className="data_toggle" onClick={() => handleChange(i)}>
                  <AiOutlineDown className="down" />
                  <IoIosArrowUp className="arrowUp" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataColumns;
