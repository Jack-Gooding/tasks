import React from 'react';
import axios from 'axios';
import {Form, FormGroup, Input, InputGroup} from 'reactstrap';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      data: {},
      input: "",
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

  componentDidUpdate() {
    if(this.nameInput) {
      this.nameInput.focus();
    }

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
    //console.log(e.target.value);
    this.props.onEdit({
                value:e.target.value,
                row:  this.props.row,
                name: e.target.name
                      });
  }

  handleClick() {
    console.log("test")
  }

  handleChange(event) {
    //console.log(event.target.value)
    //console.log(event.target.name)
    this.setState({input: event.target.value});
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
               <Input autoFocus ref={(input) => { this.nameInput = input; }} name={this.props.name} onKeyDown={(e) => this.handleKeyDown(e)} onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} placeholder={propData} value={this.state.input}/>
           :
            <p className={this.props.style} color="info" name={this.props.name} onClick={this.toggleEditing.bind(this)}>{propData}</p>}
            </td>
    );
}
}

//<InputGroupAddon style={{margin: 0, width:"20%"}} addonType="append"><Button color="info" name={this.props.name} type="submit" onClick={(e) => this.updateValue(e)}>✔</Button></InputGroupAddon>
