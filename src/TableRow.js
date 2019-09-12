import React from 'react';
import axios from 'axios';
import {Alert, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusEdit : false,
      taskEdit: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  toggleEditing(e) {
    let name;
    console.log(e);
    if (Object.keys(e) > 1) {
    name = e.target.name;
    } else {
      name = e;
    }
    this.setState({[`${name}Edit`]: `!this.state.${name}Edit`});
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.updateValue(e);
    }
  }

  updateValue(e) {
    this.toggleEditing(e);
    this.props.onEdit({
                value:e.target.value,
                row: this.props.rowIndex,
                name: e.target.name
                      });
  }

  handleClick() {
    console.log("test")
  }

  onFormSubmit() {
    alert(JSON.stringify(this.state, null, '  '));
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
      {this.state.statusEdit ?
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup>
          <InputGroup>
            <Input name="status" onKeyDown={(e) => this.handleKeyDown(e)} placeholder="" />
            <InputGroupAddon addonType="append"><Button color="info" name="status" onClick={(e) => this.updateValue(e)}>✔</Button></InputGroupAddon>
          </InputGroup>
          </FormGroup>
        </Form>
        :
         <p name="status" onClick={(e) => this.toggleEditing(e)}>{row.status}</p>}
         </td>
         <td>
         {this.state.taskEdit ?
           <Form onSubmit={this.onFormSubmit}>
             <FormGroup>
             <InputGroup>
               <Input name="task" onKeyDown={(e) => this.handleKeyDown(e)} placeholder="" />
               <InputGroupAddon addonType="append"><Button color="info" name="task" onClick={(e) => this.updateValue(e)}>✔</Button></InputGroupAddon>
             </InputGroup>
             </FormGroup>
           </Form>
           :
            <p color="info" name="task" onClick={e => this.toggleEditing("task")}>{row.task}</p>}</td>
      <td>{row.description}</td>
      <td>{row.notes}</td>
      <td>{row.dateAdded}</td>
      <td>{row.dateDue}</td>
      <td>{row.dateCompleted}</td>

      </tr>
    );
}
}
