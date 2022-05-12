import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {IoReturnDownBackOutline} from 'react-icons/io5'
import { Button, Container, Form, Modal } from 'react-bootstrap';
import TableData from '../../components/TableData';
import './upload.css';

const Upload = (props) => {

  let history = useNavigate();

  const [file, setFile] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [query, setQuery] = useState(0);
  const [onModal, setOnModal] = useState(false);

  console.log(dataSource);
  console.log(columns)

  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnChangeInput = (e) => {
      setQuery(e.target.value);
  }

  const getInputName = (e) => {
      props.onSaveInputName(e.target.value);
  }

  const handleOnSubmit = async (e) => {
      e.preventDefault();

      if (file) {
          let formData = new FormData();
          formData.append('file', file);
          formData.append("upload_preset", "ml_default");
          formData.append('row', 3)

          const response = await axios.post('http://localhost:8000/api/test/?row=' + query, formData)
          const data = response.data;

          props.onSaveData(data);
          prepareData(data.health);
          
          console.log(dataSource)
      }
  };

  const prepareData = (data) => {
      const col = [{
          title: 'Id',
          key: 'index',
          render: (text, record, index) => index,
      }];

      for (let key in data) {
          col.push({
              title: key,
              dataIndex: key,
              key: 'key',
          })
      }
      setColumns(col)

      const dataSourceTemp = [];
      if (Object.keys(data).length > 0) {
          const properties = Object.keys(data)[0];
          for (let i = 0; i < data[properties].length; i++) {
              const obj = {};
              obj['key'] = i;
              for (let key in data) {
                  obj[key] = data[key][i];
              }
              dataSourceTemp.push(obj);
          }
      }
      setDataSource(dataSourceTemp);
      props.saveListObject(dataSourceTemp)
  }

  const handleClickHistory = () => {
    history('/chart')
  }

  return (
    <>
    <div className='upload_container'>
        <Link className='upload_btn btn btn-light my-3' to='/'>
          <IoReturnDownBackOutline/>  Back
        </Link>
        <Container>
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-lg">
                Upload File
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Small file input example</Form.Label>
                <Form.Control type="file" size="sm" name="upload_file" accept=".csv" onChange={handleOnChange} className="mb-2" />
                <Form.Control size="sm" placeholder="Small text" onChange={handleOnChangeInput} type="number" min={0} value={query} className="mb-2" />
                <Form.Control size="sm" placeholder="Small text" onChange={getInputName} type="text" className="mb-2" />
                <Button variant="secondary" size="sm" onClick={handleOnSubmit}>
                  Import
                </Button>
              </Form.Group>
                <TableData columns={columns} data={dataSource} />
                  <div className="d-flex flex-row-reverse">
                    <Button className="mx-2" variant="outline-warning" size="sm" onClick={handleClickHistory}> Ok </Button>
                  </div>
            </Modal.Body>
          </Container>
      </div>
    </>
  )
}

export default Upload