import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './NavBarScreen/Header/Header';
import ImportFile from './components/ImportFile';
import Visualize from './components/Visualize';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { Container } from 'react-bootstrap';
import Upload from './screens/upload/Upload';
import Chart from './screens/Chart/Chart'
import Table from './screens/Table/Table';


function App() {
  const [data, setData] = useState('');
  const [columns, setColumns] = useState([]);
  const [types , setTypes] = useState([]);
  const [listObject, setListObject] = useState([]);
  const [inputName, setInputName] = useState('');

  const [nameData, setNameData] = useState([])

  const [datas, setDatas] = useState([]); 

  console.log('Check data here: ',datas);
  console.log("Check List Object here: ", listObject)
  console.log('Check column:', columns)
  console.log('Check data in app: ', data)



  const saveListObject = (listObjectData) => {
    setListObject(pre => [...pre, listObjectData])
  } 

  const saveInputName = (inputName) => {
    setInputName(inputName);
  }

  const saveData = (data) => {
    setData(data.health);
    const type = JSON.parse(data.dtypes);
    setTypes(type)
    
    const col = [];
    for (const key in data.health)
      col.push(key);
    setColumns(pre => [...pre, col]);
    setDatas(pre => [...pre, data.health])
  }

  const inputDataName  = (name) => {
    setNameData(pre => [...pre, name])
  }

  return (
    <Router>
      <Header/>
        <main>
          <div className='app_container'>
            <Routes>
              <Route path='/' element={<HomeScreen/>} exact/>
              <Route path='/upload'
                 element={
                   <Upload 
                    onSaveData = {saveData} 
                    saveListObject={saveListObject} 
                    onSaveInputName={saveInputName}
                    inputDataName = {inputDataName}
                    />
                  }
               />
              {(data ? 
                  <Route path='/chart' 
                    element={
                      <Chart 
                        data={data} 
                        columns={columns} 
                        types={types} 
                        // thay đổi index của listObjData[index]
                        listObjData={listObject[0]} 
                        nameData = {nameData}
                      />
                    }
                  /> 
                  : null)
              }
              <Route path='/table' 
                 element={
                   <Table 
                    data={data} 
                    columns={columns}
                     />
                  }
              />
            </Routes>
          </div>
        </main>
    </Router>
  );
}

export default App;
