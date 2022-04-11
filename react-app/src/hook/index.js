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