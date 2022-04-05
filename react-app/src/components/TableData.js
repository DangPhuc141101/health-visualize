import { Table, Switch, Space } from 'antd';
import React, { useState } from 'react'
import './TableData.css'
const TableData = (props) => {
    const [checkStrictly, setCheckStrictly] = useState(false);
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
            <Space align="center" style={{ marginBottom: 16 }}>
                CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
            </Space>
            <Table
                columns={props.columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={props.data}
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240}}
            />
        </>
    );
}

export default TableData;