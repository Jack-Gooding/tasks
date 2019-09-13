import React from 'react';
import axios from 'axios';
import {Alert, CustomInput, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import EditData from './EditData';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.rowData.status,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.setState({row: {}});
    this.setState({row: this.props.rowData});
  }

  handleToggle(e) {
    this.setState({status: !this.state.status});
    this.props.onEdit({
                value:e.target.checked,
                row:  this.props.rowIndex,
                name: e.target.name
                      });
  }


  render() {
    let row = this.props.rowData;
    return (
      <tr key={row[this.props.headers[0]]}>
      <td>{row.rowid}
      <FormGroup check inline>
       <Label check>
          <Input type="checkbox" />
       </Label>
     </FormGroup></td>
      <td>{row.category}</td>
      <td>
      <input name="status" type="checkbox" checked={(this.state.status == 1) ? true : false} onClick={this.handleToggle.bind(this)}></input>
      </td>
      <EditData data={this.props.rowData.task} name="task" index={this.props.rowIndex} onEdit={this.props.onEdit} />
      <EditData data={this.props.rowData.description} name="description" index={this.props.rowIndex} onEdit={this.props.onEdit} />
      <td>{row.notes}</td>
      <td>{row.dateAdded}</td>
      <td>{row.dateDue}</td>
      <td>{row.dateCompleted}</td>

      </tr>
    );
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
