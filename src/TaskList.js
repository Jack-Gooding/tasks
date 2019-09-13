import React from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';
import TableRow from './TableRow';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    console.log("test")
  }

  renderTableHeader() {
     let header = Object.keys(this.props.data[0]);
     console.log(Object.keys(this.props.data[0]));
     return header.map((key, index) => {
        return <th key={index}>{key}</th>
     })
  }
/*
  {headers.map((header, headerIndex) => {
    return <td onClick={() => this.props.onClick(header,rowIndex+1,row[header])}>{row[header]}</td>
   })}
   */

   renderTableRows() {
   return this.props.data.map((row, rowIndex) => {
      let headers = Object.keys(this.props.data[0]);
      return (
        <TableRow key={rowIndex} onEdit={(e) => this.props.onEdit(e)} rowData={row} rowIndex={rowIndex} headers={headers}/>
       )
   })
}

renderTableData(row) {
console.log(row);
 return this.props.data.map((col, index) => {
    return (
       <td>
         {col[0]}
       </td>
    )
 })
}

//<tr>{this.renderTableHeader()}</tr>

  render() {

    return (
      <Table sm striped hover style={{borderTop: 0}}>
        <thead style={{borderTop: 0}}>
          <tr style={{borderTop: 0}}>
            <th style={{background: "#297ca6", color: "white", borderRadius: "10px 0 0 0"}}>Row ID</th>
            <th>Category</th>
            <th>Status</th>
            <th>Task</th>
            <th>Description</th>
            <th>Notes</th>
            <th>Date Added</th>
            <th>Date Due</th>
            <th style={{background: "#297ca6", color: "white", borderRadius: "0 10px 0 0 "}}>Date Completed</th>
          </tr>
        </thead>
        <tbody style={{"border-radius": "10px"}}>
          {this.renderTableRows()}
        </tbody>
      </Table>
    );
}
}
