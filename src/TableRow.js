import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import EditData from './EditData';
import styles from './css/TableRow.module.css';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      row: this.props.rowData
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  handleToggle(e) {
    this.props.onEdit({
                value:e.target.checked,
                row:  this.props.rowData.rowid,
                name: e.target.name
                      });
  }

  deleteClick(e) {
    this.props.deleteRow(this.props.rowData.rowid);
  }


  render() {
    let row = this.props.rowData;
    let style = (this.props.status == 1) ? styles.complete : styles.incomplete;
    if (this.state.loaded) {
      //console.log(row);
      //console.log(this.props.status);
      return (
      <tr key={this.props.rowData.rowid}>
      <td className={style}>
        <input name="status" type="checkbox" defaultChecked={(this.props.status === 1 || this.props.status === true)} onClick={this.handleToggle.bind(this)}></input>
      </td>
      <td className={style}>{row.rowid}</td>
      <EditData style={style} data={row.category || "--"} row={this.props.rowData.rowid} name="category" index={this.props.rowIndex} onEdit={this.props.onEdit} />
      <EditData style={style} data={row.task || "--"} row={this.props.rowData.rowid} name="task" index={this.props.rowIndex} onEdit={this.props.onEdit} />
      <EditData style={style} data={row.description || "--"} row={this.props.rowData.rowid} name="description" index={this.props.rowIndex} onEdit={this.props.onEdit} />
      <EditData style={style} data={row.notes || "--"} row={this.props.rowData.rowid} name="notes" index={this.props.rowIndex} onEdit={this.props.onEdit} />
      <td className={style}>{moment(row.dateAdded).fromNow()}</td>
      <td className={style}>{(row.dateDue) ? moment(row.dateDue).fromNow() : "--"}</td>
      <td className={style}>{(row.dateCompleted) ? moment(row.dateCompleted).fromNow() : "--"}</td>
      <td className={style}><FaTrashAlt onClick={this.deleteClick} className={styles.trashIcon} /></td>
      </tr>
      );
    } else {
        return (
          <tr>
            <td>loading...</td>
          </tr>
        )
    }
  }
}
/*
<td>
{this.state.taskEdit ?
  <Form onSubmit={this.onFormSubmit}>
  <FormGroup>
  <InputGroup>
  <Input name="task" onKeyDown={(e) => this.handleKeyDown(e)} onChange={this.handleChange.bind(this)} placeholder="" value={rowState.task}/>
  <InputGroupAddon addonType="append"><Button color="info" name="task" type="submit" onClick={(e) => this.updateValue(e)}>✔</Button></InputGroupAddon>
  </InputGroup>
  </FormGroup>
  </Form>
  :
  <p color="info" name="task" onClick={() => this.toggleEditing("task")}>{row.task}</p>}</td>
*/
