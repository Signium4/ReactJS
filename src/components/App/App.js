import styles from "./App.module.scss";
import classnames from "classnames/bind"
import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import ProjectList from '../ProjectList/ProjectList';
import { basicTheme, ThemeContext } from './ThemeContext';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";

const cx = classnames.bind(styles)

const projects = [
  {
    id: 1,
    name: 'Универ',
    tasks: [
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
    ]
  },
  {
    id: 2,
    name: 'Домашние дела',
    tasks: [
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
      }
    ]
  },
  {
    id: 3,
    name: 'Всякие свои дела',
    tasks: [
      {
        id: 8,
        name: 'Прослушка',
        description: 'Послушать новый небольшой мюзикл от группы "Дайте Танк (!)"',
        completed: false
      },
      {
        id: 9,
        name: 'План',
        description: 'Составить список дел',
        completed: true
      },
    ]
  }
]


const normalize = (arr) => {
  const normalizedProjects = {};
  const normalizedTasks = {};
  projects.map(
    project => {
      const projectNormalized = {
        id: project.id,
        name: project.name,
        tasks: project.tasks.map(task => task.id)
      }
      normalizedProjects[projectNormalized.id] = projectNormalized;
      project.tasks.map(
        task => {
          const taskNormalized = {
            id: task.id,
            name: task.name,
            description: task.description,
            completed: task.completed,
          }
          normalizedTasks[taskNormalized.id] = taskNormalized;
        }
      )
    }
  )
  const normalizedState = {
    theme: basicTheme,
    projectsById: normalizedProjects,
    tasksById: normalizedTasks,
    newProject: {
      id: projects.length + 1,
      name: '',
      tasks: []
    },
    newTask: {
      id: Object.keys(normalizedTasks).length + 1,
      name: '',
      description: '',
      completed: false,
    }
  }
  return normalizedState;
}

class App extends React.Component {

  state = normalize(projects);

  handleClickChangeTheme = () => {
    const current = (this.state.theme === 'light') ? 'dark' : 'light';
    this.setState((currentState) => {
      const newState = {
        projectsById: { ...currentState.projectsById },
        tasksById: { ...currentState.tasksById },
        newProject: { ...currentState.newProject },
        newTask: { ...currentState.newTask },
        theme: current
      }
      return newState
    })
  }

  //Функции для передачи в ProjectList
  inputChangeProject = (event) => {
    const { value, name } = event.currentTarget

    this.setState((currentState) => {
      const newState = {
        projectsById: { ...currentState.projectsById },
        tasksById: { ...currentState.tasksById },
        newProject: { ...currentState.newProject },
        newTask: { ...currentState.newTask },
        theme: currentState.theme
      }

      newState.newProject = { ...currentState.newProject, [name]: value }
      return {
        projectsById: newState.projectsById,
        tasksById: newState.tasksById,
        newProject: newState.newProject,
        newTask: newState.newTask,
        theme: newState.theme,
      }
    })
    // console.log(this.context)
  }

  addProject = () => {
    const lastProjectId = Object.keys(this.state.projectsById).length;
    this.setState((currentState) => {
      const newProjects = { ...currentState.projectsById, [lastProjectId + 1]: currentState.newProject }
      return {
        projectsById: newProjects,
        tasksById: { ...currentState.tasksById },
        newTask: { ...currentState.newTask },
        theme: currentState.theme,
        newProject: {
          id: lastProjectId + 2,
          name: '',
          tasks: []
        }
      }
    })
  }

  //Функции для передачи в TaskList
  inputChangeTask = (event) => {
    console.log(this.state);
    console.log(event);
    const { value, name } = event.currentTarget

    this.setState((currentState) => {
      const newState = {
        projectsById: { ...currentState.projectsById },
        tasksById: { ...currentState.tasksById },
        newProject: { ...currentState.newProject },
        newTask: { ...currentState.newTask },
        theme: currentState.theme
      }

      newState.newTask = { ...currentState.newTask, [name]: value }

      return newState
    })
  }

  addTask = (projectId) => {
    const lastTaskId = Object.keys(this.state.tasksById).length;

    this.setState((currentState) => {
      const newState = {
        projectsById: { ...currentState.projectsById },
        tasksById: { ...currentState.tasksById },
        newProject: { ...currentState.newProject },
        newTask: {
          id: lastTaskId + 2,
          name: '',
          description: '',
          completed: false
        },
        theme: currentState.theme
      }

      const newTasks = [...currentState.projectsById[projectId].tasks];
      newTasks.push(Number(lastTaskId + 1));
      newState.projectsById[projectId] = { ...newState.projectsById[projectId], tasks: newTasks }
      newState.tasksById = { ...currentState.tasksById, [lastTaskId + 1]: currentState.newTask }
      return newState
    })
    console.log(this.state)
  }

  changeTaskStatus = (id) => {
    const taskIndex = this.state.tasksById[id].id;

    this.setState((currentState) => {
      const newState = {
        projectsById: { ...currentState.projectsById },
        tasksById: { ...currentState.tasksById },
        newProject: { ...currentState.newProject },
        newTask: { ...currentState.newTask },
        theme: currentState.theme
      }

      newState.tasksById[taskIndex] = { ...newState.tasksById[taskIndex], completed: !newState.tasksById[taskIndex].completed }
      return newState
    })
  }


  render() {
    console.log(this.state)
    return (
      <BrowserRouter>
        <ThemeContext.Provider value={this.state.theme}>
          <Route path="/">
            <div className={cx(`div-theme-${this.state.theme}`)}>
              <h1 className={cx("heading")}>Список дел</h1>
              <button className={cx("changeTheme")} onClick={this.handleClickChangeTheme}>Сменить тему</button>
            </div>
          </Route>
          <Route exact path="/">
            <div className={cx(`div-theme-${this.state.theme}`)}>
              <h2 className={cx("headingLink")}>
                <Link className={cx(`link-theme-${this.state.theme}`)} to="/projects/">Мои проекты</Link>
              </h2>
            </div>
          </Route>
          <Route exact path="/projects/">
            <div className={cx(`div-theme-${this.state.theme}`)}>
              <h2 className={cx("heading-small")}>Мои проекты</h2>
              <button className={cx("changeTheme")} onClick={this.handleClickChangeTheme}>Сменить тему</button>
              <ProjectList projectsById={this.state.projectsById} inputChange={this.inputChangeProject} addProject={this.addProject} newProjectName={this.state.newProject.name} />
            </div>
          </Route>
          <Route exact path="/projects/:projectId">
            <div className={cx(`div-theme-${this.state.theme}`)}>
              <div>
                <TaskList changeStatus={this.changeTaskStatus} projects={this.state.projectsById} tasks={this.state.tasksById} addTask={this.addTask} inputChange={this.inputChangeTask} newTaskName={this.state.newTask.name} newTaskDescription={this.state.newTask.description} />
              </div>
            </div>
          </Route>
          <Route exact path="/404/">
            <h2 className={cx("headingLink")}>
              <Link className={cx(`link-theme-${this.state.theme}`)} to="/projects/">К списку проектов</Link>
            </h2>
            <h2 className={cx("headingLink")}>
              <Link className={cx(`link-theme-${this.state.theme}`)} to="/">На главную страницу</Link>
            </h2>
            <span className={cx('mistake')}>Oшибка 404</span>
            <span className={cx('mistake-small', 'mistake')}>одна ошибка - и ты ошибся</span>
          </Route>
        </ThemeContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App;