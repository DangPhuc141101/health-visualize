import React from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { InputGroup, ListGroup } from "react-bootstrap";
import { AiOutlineDoubleLeft } from "react-icons/ai";

const DataColumns = (props) => {
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
          {props.columns.map((column, index) => (
            <div
              draggable="true"
              id="src_copy"
              key={index}
              onDragStart={(e) => props.dragstart_handler(e, column)}
              onDragEnd={(e) => props.dragend_handler(e)}
            >
              <ListGroup>
                <ListGroup.Item>{column}</ListGroup.Item>
              </ListGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataColumns;
