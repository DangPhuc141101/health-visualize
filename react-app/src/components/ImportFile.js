import React, { useState } from "react";
import axios from 'axios'
import TableData from './TableData'

import './ImportFile.css'

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
        document.body.style.background = '#808080';
    }

    const hideModal = () => {
        setOnModal(false);
        document.body.style.background = '#fff';
    }
    return (
        <div>
        <div className="modal" style={{display: onModal ? 'block' : 'none'}}>
            <div className="modal-header">
                <h2>REACTJS CSV IMPORT EXAMPLE TEST</h2>
            </div>
            <div className="modal-body">
                <form>
                    <div className="row">
                        <input type={"file"}
                            id={"csvFileInput"}
                            name="upload_file"
                            accept={".csv"}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="row">
                        <label>Number of row delete </label>
                        <input placeholder="Start row header" onChange={handleOnChangeInput} type="number" min={0} value={query} />
                    </div>
                    <div className="row">
                        <label>Name of data </label>
                        <input placeholder="Name" onChange={getInputName}  />
                    </div>
                    <div className="row">
                        <button onClick={handleOnSubmit}>IMPORT CSV</button>
                    </div>
                </form>
                <TableData columns={columns} data={dataSource} />
            </div>
            <div className="modal-footer">
                <button type="button" onClick={hideModal}>Ok</button>
                <button type="button" onClick={hideModal}>Close</button>
            </div>
        </div>
        <button onClick={showModal}> Upload</button>
        </div>
    );
}

export default ImportFile;