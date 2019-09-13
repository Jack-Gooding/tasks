import React from 'react';
import axios from 'axios';
import {Form, FormGroup, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      data: {}
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }


  toggleEditing(e) {
    this.setState({edit: !this.state.edit})
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.updateValue(e);
    } else if (e.key === "Escape") {
      this.toggleEditing(e.target.name);
    }
  }

  updateValue(e) {
    this.toggleEditing(e.target.name);
    console.log(e.target.value);
    this.props.onEdit({
                value:e.target.value,
                row:  this.props.index,
                name: e.target.name
                      });
  }

  handleClick() {
    console.log("test")
  }

  handleChange(event) {
    console.log(event.target.value)
    console.log(event.target.name)
    this.setState({data: event.target.value});
  }

  onFormSubmit() {
    alert(JSON.stringify(this.state, null, '  '));
  }

  render() {
    let propData = this.props.data;
    let stateData = this.state.data;
    return (
        <td>
         {this.state.edit ?
           <Form onSubmit={this.onFormSubmit}>
             <FormGroup>
             <InputGroup>
               <Input style={{margin: 0, width:"60%"}} name={this.props.name} onKeyDown={(e) => this.handleKeyDown(e)} onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} placeholder="" value={stateData}/>
               <InputGroupAddon style={{margin: 0, width:"20%"}} addonType="append"><Button color="info" name={this.props.name} type="submit" onClick={(e) => this.updateValue(e)}>✔</Button></InputGroupAddon>
             </InputGroup>
             </FormGroup>
           </Form>
           :
            <p color="info" name={this.props.name} onClick={this.toggleEditing.bind(this)}>{propData}</p>}
            </td>
    );
}
}
