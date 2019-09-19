import React from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import {Container, Row, Col, Jumbotron, Badge, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styles from './css/Tasks.module.css';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{rowid:0}],
    };
    this.updateCategory = this.updateCategory.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.createRow = this.createRow.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/tasks`)
    .then(res => {
      //console.log(res.data);
      this.setState({data: res.data,});
    }
  )
}

onRadioBtnClick(rSelected) {
  this.setState({ rSelected: rSelected });
}

updateValue(e) {
  //console.log(e);
  axios.post(`/api/tasks`, {
    header: e.name,
    rowid: e.row,
    value: e.value
  })
    .then(res => {
      //console.log("updateValue");
      //console.log(res.data);
      this.setState({data: res.data,})
    })
}

updateCategory(header,rowid,value) {
  //console.log('Click happened');
  //console.log(header);
  axios.post(`/api/tasks`, {
    header: header,
    rowid: rowid,
    value: value
  })
    .then(res => {
      this.setState({data: res.data,})
    })
}

createRow(task) {
  let category;

  if (this.state.rSelected && this.state.rSelected != 'All') {
    category = this.state.rSelected;
  }
  axios.post(`/api/create`, {
      task: task,
      category: category,
  })
  .then(res => {
    //console.log("createRow");
    //console.log(res.data);
    this.setState({data: res.data,})
  })
}

deleteRow(rowid) {
  //console.log(rowid);
  axios.post(`/api/delete`, {
    rowid: rowid,
  })
  .then(res => {
    //console.log("deleteRow");
    //console.log(res.data);
    this.setState({data: res.data,})
  })
}

  categoryBar() {
    let data = [];
    let state = this.state.data;
    for (let i=0; i < state.length; i++) {
      let notExists = true;
      for (let j=0; j < data.length; j++) {
        if(state[i].category === data[j].category) {
          notExists = false;
      }
    }
    if(notExists && state[i].category) {
      data.push({category: state[i].category, count: 0});
    }
  }
    for (let i=0; i < state.length; i++) {
      for (let j=0; j < data.length; j++) {
        if(state[i].category === data[j].category) {
          data[j].count++;
        }
      }
    }
    return data.map((cat, index) => {
    return (
      <Button color={(this.state.rSelected === cat.category) ? "primary" : "info"} onClick={() => this.onRadioBtnClick(cat.category)} active={this.state.rSelected === cat.category}>{cat.category}<Badge style={{marginLeft: "10px"}} color="primary">{cat.count}</Badge></Button>
    )
  })
  }



  render() {
    return (
      <Container>
      <Jumbotron style={{padding:"2rem 1rem",margin: "0 0 .5rem 0"}}>
        <h1>Tasks: <Badge color="info">{this.state.data.length}</Badge></h1>
        </Jumbotron>
        <Row>
          <Col sm="12">
        <ButtonGroup style={{margin: "0 0 .5rem 0"}}>
          <Button color={(this.state.rSelected === "All" || !this.state.rSelected) ? "primary" : "info"} onClick={() => this.onRadioBtnClick("All")} active={this.state.rSelected === "All"}>All</Button>
          {this.categoryBar()}
        </ButtonGroup>
        </Col>
        </Row>
        <TaskList data={this.state.data} category={this.state.rSelected} onEdit={this.updateValue} deleteRow={this.deleteRow}/>
        <Button className={styles.addNewRow} color="info" onClick={this.createRow}>Add New Task</Button>
      </Container>
    );
}
}
