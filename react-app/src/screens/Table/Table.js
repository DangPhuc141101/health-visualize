import React from 'react'
import TableData from '../../components/TableData'

const Table = (props) => {
  return (
    <div>
        <TableData columns={props.columns} data={props.data}/>
    </div>
  )
}

export default Table