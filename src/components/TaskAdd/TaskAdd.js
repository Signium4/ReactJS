import './TaskAdd.module.scss';
import React, { Component } from 'react';
import Task from '../TaskAdd/TaskAdd';

class TaskAdd extends React.Component {
  // constructor(props){
  //   super(props);
  //   state={
  //     name: '',
  //     description: ''
  //   }
  // }

    inputChange = (event) => {
        const { value, name } = event.currentTarget
    
        this.setState((currentState) => {
          const newState = {...currentState, [name]: value}
          return{
            newState
          }
        })
      }
      
    render() {
      return (
        <div>
          {/* <input value={this.state.newTask.name} onChange={this.inputChange} name="name" placeholder="Имя дела"/>
          <input value={this.state.newTask.description} onChange={this.inputChange} name="description" placeholder="Описание"/>
          <button onClick={props.addTask}>Добавить</button> */}
        </div>
      );
    }
  }
  
  export default TaskAdd;