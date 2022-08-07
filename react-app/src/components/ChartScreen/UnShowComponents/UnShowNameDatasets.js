import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import "./index.css";

const UnShowNameDatasets = (props) => {
  return (
    <>
      <div className="small_icon">
        <AiOutlineDoubleRight onClick={props.handleShow} />
      </div>
      <span className="rotate">Name of dataset</span>
    </>
  );
};

export default UnShowNameDatasets;
