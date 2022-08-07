import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Upload from "./components/UploadScreen/Upload";
import Table from "./components/TableScreen/Table";
import Chart from "./components/ChartScreen/Chart/Chart";
import ChartTest from "./components/ChartScreen/Chart/ChartTest";

function App() {
  const [data, setData] = useState("");
  const [columns, setColumns] = useState([]);
  const [types, setTypes] = useState([]);
  const [listObject, setListObject] = useState([]);
  const [inputName, setInputName] = useState("");

  const [nameData, setNameData] = useState([]);

  const [datas, setDatas] = useState([]);

  console.log(nameData);

  const saveListObject = (listObjectData) => {
    setListObject(listObjectData);
    // setListOject([...listOjectDat, listOjectdata])
    //
  };

  const saveInputName = (inputName) => {
    setInputName(inputName);
  };

  const saveData = (data) => {
    setData(data.health);
    const type = JSON.parse(data.dtypes);
    setTypes(type);

    const col = [];
    for (const key in data.health) col.push(key);
    setColumns(col);
  };

  const inputDataName = (name) => {
    setNameData((pre) => [...pre, name]);
  };

  return (
    <Router>
      <Header />
      <main>
        <div className="app_container">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route
              path="/upload"
              element={
                <Upload
                  onSaveData={saveData}
                  saveListObject={saveListObject}
                  onSaveInputName={saveInputName}
                  inputDataName={inputDataName}
                />
              }
            />
            {data ? (
              <Route
                path="/chart"
                element={
                  <ChartTest
                    data={data}
                    columns={columns}
                    types={types}
                    listObjData={listObject}
                    nameData={nameData}
                  />
                }
              />
            ) : null}
            <Route
              path="/table"
              element={<Table data={data} columns={columns} />}
            />
          </Routes>
        </div>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
