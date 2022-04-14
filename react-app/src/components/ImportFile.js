import React, { useState } from "react";
import axios from 'axios'
import TableData from './TableData'
import { Navbar, Nav, Container, Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImportFile(props) {
    const [file, setFile] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState([]);
    const [query, setQuery] = useState(0);
    const [onModal, setOnModal] = useState(false);

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

    const showModal = () => {
        setOnModal(true);
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" onClick={showModal}>Upload</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                size="lg"
                show={onModal}
                onHide={() => setOnModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        REACTJS CSV IMPORT EXAMPLE TEST
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
                        <Button className="mx-2" variant="secondary" size="sm" onClick={() => setOnModal(false)}> Close </Button>
                        <Button className="mx-2" variant="outline-warning" size="sm" onClick={() => setOnModal(false)}> Ok </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ImportFile;