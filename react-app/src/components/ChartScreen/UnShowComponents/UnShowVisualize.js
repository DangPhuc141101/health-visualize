import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import "./index.css";

const UnShowVisualize = (props) => {
  return (
    <>
      <div className="small_icon">
        <AiOutlineDoubleRight onClick={props.handleShowName} />
      </div>
      <span className="rotate">Visualization</span>
    </>
  );
};

export default UnShowVisualize;
