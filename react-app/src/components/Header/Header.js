import React, {useState} from 'react';
import axios from 'axios';
import TableData from '../TableData/TableData';
import "./header.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavLink, NavDropdown } from 'react-bootstrap'
import {AiOutlineHome, AiOutlineBarChart, AiOutlineBell} from 'react-icons/ai'
import {BsTable, BsUpload} from 'react-icons/bs'
import {RiAccountCircleLine} from 'react-icons/ri'

const Header = (props) => {

  return (
    <header>
      <Navbar>
          <div className='header_container'>
            <div className='header_title'>
                <LinkContainer to='/'>
                    <NavLink >
                      <AiOutlineHome/> Home
                    </NavLink>
                </LinkContainer>
                <LinkContainer to='/table'>
                    <NavLink >
                      <BsTable/> Table
                    </NavLink>
                </LinkContainer>
                <LinkContainer to='/chart'>
                    <NavLink >
                      <AiOutlineBarChart/> Chart
                    </NavLink>
                </LinkContainer>
                <LinkContainer to='/upload'>
                    <NavLink >
                      <BsUpload/> Upload
                    </NavLink>
                </LinkContainer>
            </div>
            <div className='header_account'>
              <LinkContainer to='/upload'>
                <NavLink >
                  <AiOutlineBell/>
                </NavLink>
              </LinkContainer>
              <LinkContainer to='/account'>
                <NavLink >
                  <RiAccountCircleLine/>
                </NavLink>
              </LinkContainer>
            </div>
          </div>
      </Navbar>
    </header>
  )
}

export default Header;