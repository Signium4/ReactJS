import styles from './TaskList.module.scss';
import React, { Component } from 'react';
import Task from '../Task/Task';
import classnames from "classnames/bind"
import { ThemeContext } from "../App/ThemeContext";

const cx = classnames.bind(styles)

let listOfTasks = [
    {
      id: 1,
      name: 'Домашняя работа по ReactJS',
      description: 'Сделать ДЗ3 к 22.04 ',
      completed: false
    },
    {
      id: 2,
      name: 'GitHub',
      description: 'Посмотреть парочку статей про работу с GitHub, что-нибудь на YouTube',
      completed: false
    },
    {
      id: 3,
      name: 'Экзамен на военке',
      description: 'Посмотреть материалы по всп, написать билеты',
      completed: true
    },
    {
      id: 4,
      name: 'ДЗ по менеджменту',
      description: 'Выбрать сферу компаний для дз по стратегическому менеджменту',
      completed: true
    },
    {
      id: 5,
      name: 'Уборка квартиры',
      description: 'Пропылесосить, стереть пыль, помыть полы в квартире',
      completed: true
    },
    {
      id: 6,
      name: 'Уход за домашним скотом',
      description: 'Налить воды муравьям и улиткам, покормить улиток',
      completed: false
    },
    {
      id: 7,
      name: 'Поход',
      description: 'Сходить в магазин за продуктами',
      completed: false
    },
    {
      id: 8,
      name: 'Уроки',
      description: 'Проверить домашнюю работу у брата',
      completed: false
    },
    {
      id: 9,
      name: 'Прослушка',
      description: 'Послушать новый небольшой мюзикл от группы "Дайте Танк (!)"',
      completed: false
    },
    {
      id: 10,
      name: 'План',
      description: 'Составить список дел',
      completed: true
    },
  ]

class TaskList extends React.Component {

  static contextType = ThemeContext;
  
  state={
    tasks: listOfTasks,
    newTask : {
      id: listOfTasks.length + 1,
      name: '',
      description: '',
      completed: false}
  }
  
  inputChange = (event) => {
    const { value, name } = event.currentTarget

    this.setState((currentState) => {
      const newState = {tasks: [...currentState.tasks], newTask: {...currentState.newTask}}
      newState.newTask = {...currentState.newTask, [name]: value}
      return{
        tasks: newState.tasks,
        newTask: newState.newTask
      }
    })
  }

  addTask = () => {
    const lastId = this.state.tasks.length;
    this.setState((currentState) => {
      const newTasks = [...currentState.tasks, currentState.newTask]
      return{
        tasks: newTasks,
        newTask: {
          id: lastId + 2,
          name: '',
          description: '',
          completed: false}
      }
   })
  }

  changeTaskStatus = (id) => {
  const taskIndex = this.state.tasks.findIndex(task => task.id === id);

  this.setState((currentState) => {
    const newState = {tasks: [...currentState.tasks], newTask: {...currentState.newTask}}
    newState.tasks[taskIndex] = {...newState.tasks[taskIndex], completed: !newState.tasks[taskIndex].completed}
    return{
      tasks: newState.tasks,
      newTask: newState.newTask
    }
  })
  }

  render() {
    return (
      <div>
        <div className={cx("flexDiv", "flexDiv-input")}>
          <input className={cx(`input-theme-${this.context}`)} value={this.state.newTask.name} onChange={this.inputChange} name="name" placeholder="Имя дела"/>
          <input className={cx(`input-theme-${this.context}`)} value={this.state.newTask.description} onChange={this.inputChange}
          name="description" placeholder="Описание"/>
          <button className={cx("button", `button-theme-${this.context}`)} onClick={this.addTask} on>Добавить</button>
        </div>
        <div className={cx("flexDiv")}>
          {this.state.tasks.map(task => <Task id={task.id} name={task.name} description={task.description}
          completed={task.completed} changeStatus={this.changeTaskStatus}/>)}
        </div>
      </div>
    );
  }
}

export default TaskList;