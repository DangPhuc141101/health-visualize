import { Table, Switch, Space } from 'antd';
import React, { useState } from 'react'
import './TableData.css'
const TableData = (props) => {
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    return (
        <>
            <Table
                columns={props.columns}
                rowSelection={{ ...rowSelection }}
                dataSource={props.data}
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240, x : 1000}}
            />
        </>
    );
}

export default TableData;