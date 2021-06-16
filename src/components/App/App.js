import './App.css';
import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';


class App extends React.Component {
  render() {
    return(
    <div>
      <h1 className="heading">Список дел</h1>
      <div>
        <TaskList />
      </div>
    </div>
    )
  }
}

export default App;