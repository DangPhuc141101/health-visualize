import React, { useState, useEffect } from "react";
import axios from "axios";

// Submit a form data contain file is uploaded from user
export const useData = (formData, query) => {
    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log("use ecffect")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/test/?row=' + query, formData)
            setIsLoading(false);
            if (response.data) {
                setListData(response.data);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }, []);

    return [listData, isLoading];
};

export const sum = (data, x, y) => {
    const obj = {};
    
    data.forEach((element, i) => {
        if (!obj[element[x]]) obj[element[x]] = element[y];  
        else obj[element[x]] += element[y]; 
    })

    const res= [];
  
    for (let key in obj){
        const resObj ={};
        resObj[x] = key;
        resObj[y] = +(Math.round(obj[key] + "e+2")  + "e-2");
        res.push(resObj);
    }
    res.sort((a, b) => b[y] - a[y]);
    return res;
}

export const max = (data, x, y) => {
    const obj = {};
    
    data.forEach((element, i) => {
        if (!obj[element[x]]) obj[element[x]] = element[y];  
        else obj[element[x]] = obj[element[x]] < element[y] ? element[y] :obj[element[x]] ; 
    })

    const res= [];
    for (let key in obj){
        const resObj ={};
        resObj[x] = key;
        resObj[y] = obj[key];
        res.push(resObj);
    }
    return res;
}

export const min = (data, x, y) => {
    const obj = {};
    
    data.forEach((element, i) => {
        if (!obj[element[x]]) obj[element[x]] = element[y];  
        else obj[element[x]] = obj[element[x]] > element[y] ? element[y] :obj[element[x]] ; 
    })

    const res= [];
    for (let key in obj){
        const resObj ={};
        resObj[x] = key;
        resObj[y] = obj[key];
        res.push(resObj);
    }
    return res;
}

const count = (data, x, y) => {
    const obj = {};
    
    data.forEach((element, i) => {
        if (!obj[element[x]]) obj[element[x]] = 1;  
        else obj[element[x]] += 1; 
    })

    const res= [];

    for (let key in obj){
        const resObj ={};
        resObj[x] = key;
        resObj[y] = obj[key];
        res.push(resObj);
    }
    return res;
}

export const average = (data, x, y) => {
    const listSum = sum(data, x, y);
    const listCount = count(data, x, y);
    
    const listAverage = [];
    for (let i=0; i<listSum.length; i++){
        const obj = {};
        obj[x] = listSum[i][x];
        obj[y] = listSum[i][y]*1.0 / listCount[i][y];
        listAverage.push(obj);
    }
    return listAverage;
}

export const countColumn = (data, x) => {
    const columns = new Set();
    data.forEach((element) => {
        columns.add(element[x]) ;
    })
   
    return columns.size;
}

export const getLegend = (data, x) => {
    const columns = new Set();
    data.forEach((element) => {
        columns.add(element[x]) ;
    })
    
    return columns;
}

