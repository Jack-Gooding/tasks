import React from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';
import TableRow from './TableRow';
import styles from './css/TableHeader.module.css';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }



  renderTableHeader() {
     let header = Object.keys(this.props.data[0]);
     //console.log(Object.keys(this.props.data[0]));
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
      let existingCategory = true;
        for (let i = 0; i < this.props.data.length; i++) {
          if (this.props.data[i].category === this.props.category) {
            existingCategory = false;
          }
        }
        if (row.category === this.props.category || existingCategory) {
      return (
        <TableRow key={rowIndex} status={row.status} onEdit={(e) => this.props.onEdit(e)} deleteRow={(e) => this.props.deleteRow(e)} rowData={row} rowIndex={rowIndex} headers={headers}/>
       )
     } else {
       return (null)
     }
   })
}

renderTableData(row) {
//console.log(row);
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
      <Table striped hover size="sm">
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Row ID</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Task</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Notes</th>
            <th className={styles.th}>Date Added</th>
            <th className={styles.th}>Date Due</th>
            <th className={styles.th}>Date Completed</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </Table>
    );
}
}
