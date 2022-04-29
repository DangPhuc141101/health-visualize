import React from 'react'
import {Link} from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  return (
    <>
      <div className='homeScreen_container'>
        <div className='homeScreen_title'>
          <h3>Getting Started</h3>
        </div>
        <div className='homeScreen_option'>
            <h7>Please upload you file to draw chart</h7>
            <Link to='/upload'>
                Upload File CSV to Create Dashboard
            </Link>
        </div>
      </div>
    </>
  )
}

export default HomeScreen