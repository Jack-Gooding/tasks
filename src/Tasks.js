import React from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import {Badge} from 'reactstrap';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{rowid:0}],
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/tasks`)
    .then(res => {
      console.log(res.data);
      this.setState({data: res.data,})
    }
  )
}

updateCategory(header,rowid,value) {
  console.log('Click happened');
  console.log(header);  
  axios.post(`/api/tasks`, {
    header: header,
    rowid: rowid,
    value: value
  })
    .then(res => {
      console.log(res.data);
    })
}

  handleClick() {
    console.log("test");
  }


  render() {
    return (
      <div>
        <h1>Tasks: <Badge color="info">{this.state.data.length}</Badge></h1>
        <TaskList data={this.state.data} onClick={this.updateCategory}/>
      </div>
    );
}
}
