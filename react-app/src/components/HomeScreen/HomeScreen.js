import React from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const WelcomeChart = () => {
  return <h3>Please upload your file to draw chart</h3>;
};

const HomeScreen = () => {
  return (
    <>
      <div className="homeScreen_container">
        <div className="homeScreen_title">
          <h3>Getting Started</h3>
        </div>
        <div className="homeScreen_option">
          <WelcomeChart />
          <Link className="option_link" to="/upload">
            Upload File CSV to Create Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
