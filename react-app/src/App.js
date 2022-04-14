import { useState } from 'react';
import './App.css';
import ImportFile from './components/ImportFile';
import Visualize from './components/Visualize';
function App() {
  console.log('render app')
  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [types , setTypes] = useState();
  const [listObject, setListObject] = useState();
  const [inputName, setInputName] = useState();
  
  const saveListObject = (listObjectData) => {
    setListObject(listObjectData)
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
    setColumns(col);
  }
  
  return (
      <div> 
        <ImportFile onSaveData = {saveData} saveListObject={saveListObject} onSaveInputName={saveInputName}/>
        <Visualize data={data} columns={columns} types={types} listObjData={listObject}/>
      </div>
  );
}

export default App;
