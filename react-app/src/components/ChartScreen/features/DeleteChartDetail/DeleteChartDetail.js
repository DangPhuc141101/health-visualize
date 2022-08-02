import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TiDeleteOutline } from "react-icons/ti";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import "./DeleteChartDetail.css";

const DeleteChartDetail = (props) => {
  console.log("delete details: ", props?.type);
  return (
    <>
      <div style={props.style}>
        <div className="deleteChart_container">
          <Container style={props?.style}>
            <Col>
              <Col className="col_1" xs>
                {<FaFileExport />} Export Data
              </Col>
              <Col
                className="col_2"
                xs={{ order: 12 }}
                onClick={() =>
                  props.handleDeleteChart(props?.type, props?.index)
                }
              >
                {<TiDeleteOutline />} Remove
              </Col>
              <Col
                className="col_3"
                xs={{ order: 1 }}
                onClick={props.handleActive}
              >
                {<RiArrowGoBackLine />} Cancle
              </Col>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
};

export default DeleteChartDetail;
