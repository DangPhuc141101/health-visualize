import React, { useState } from 'react'
import { useData } from '../hook/index'
import TableData from './TableData';
const ImportFileCSV = () => {
    const [ query, setQuery ] = useState(0);
    const [ file, setFile ] = useState();
    const [ formData, setFormData ] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState(0);
    const [ data, isLoading ] = useData(formData, query);
   
    const handleOnChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
    };
    const handleOnChangeInput = (e) => {
        setQuery(e.target.value)
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append("upload_preset", "ml_default");
            setFormData(formData);
            prepareData(data);
        }
    };

    const prepareData = (data) => {
        const col = [{
            title: 'Id',
            key: 'index',
            render : (text, record, index) => index,
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
                obj['key']= i;
                for (let key in data) {
                    obj[key] = data[key][i];
                }
                dataSourceTemp.push(obj);
            }
        }
        setDataSource(dataSourceTemp);
    }

    return (
        <div className="container" style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE TEST</h1>
            <form>
                <input type={"file"}
                    id={"csvFileInput"}
                    name="upload_file"
                    accept={".csv"}
                    onChange={handleOnChange}
                />
                <br></br>
                <input placeholder="Start row header" onChange={handleOnChangeInput} type="number" min={0} value={query}/>
                <br></br>
                <button onClick={handleOnSubmit}>IMPORT CSV</button>
            </form>
           
            <TableData columns={columns} 
                    data={dataSource} 
                    loading={isLoading}/>
        </div>
    );
}

export default ImportFileCSV;