import React from 'react';
import axios from 'axios';
import {Table, FormGroup, Label, Input} from 'reactstrap';

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
         <tr scope="row" key={row[headers[0]]}>
         <td>{row.rowid}<FormGroup check inline>
          <Label check>
             <Input type="checkbox" />
          </Label>
        </FormGroup></td>
         <td>{row.category}</td>
         <td>{row.status}</td>
         <td>{row.task}</td>
         <td>{row.description}</td>
         <td>{row.notes}</td>
         <td>{row.dateAdded}</td>
         <td>{row.dateDue}</td>
         <td>{row.dateCompleted}</td>

         </tr>
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
      <Table striped bordered hover sm>
        <thead>
          <th>Row ID</th>
          <th>Category</th>
          <th>Status</th>
          <th>Task</th>
          <th>Description</th>
          <th>Notes</th>
          <th>Date Added</th>
          <th>Date Due</th>
          <th>Date Completed</th>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </Table>
    );
}
}
