import styles from './TaskList.module.scss';
import React, { Component } from 'react';
import { TaskRedux } from '../Task/Task';
import classnames from "classnames/bind"
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { handleTaskChangeName, handleNewTaskAdd, handleTaskStatusChange, handleTaskChangeDescription } from "../../actions/task_list";

import { connect } from "react-redux";

const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  newTaskName: state.app.newTask.name,
  newTaskDescription: state.app.newTask.description,
  projects: state.app.projectsById,
  tasks: state.app.tasksById,
  theme: state.app.theme
});

const mapDispatchToProps = (dispatch) => ({
  dispatchOnNewTaskChangeName: (name) => dispatch(handleTaskChangeName(name)),
  dispatchOnNewTaskChangeDescription: (description) => dispatch(handleTaskChangeDescription(description)),
  dispatchOnNewTaskAdd: (projectId) => dispatch(handleNewTaskAdd(projectId)),
})


const TaskList = ({ newTaskName, newTaskDescription, tasks, projects, theme,
  dispatchOnNewTaskChangeName, dispatchOnNewTaskAdd, dispatchOnTaskStatusChange, dispatchOnNewTaskChangeDescription }) => {

  const { projectId } = useParams();
  if (!Number.isInteger(Number(projectId)) | (projectId > Object.keys(projects).length)) {
    return (
      <Redirect to="/404/" />
    )
  }

  const taskChangeName = (event) => {
    dispatchOnNewTaskChangeName(event.target.value)
  }

  const taskChangeDescription = (event) => {
    dispatchOnNewTaskChangeDescription(event.target.value)
  }

  const newTaskAdd = () => {
    dispatchOnNewTaskAdd(projectId)
  }

  const tasksToCraeate = projects[projectId].tasks;

  return (
    <div>
      <h2 className={cx("heading")}>Проект: {projects[projectId].name}</h2>
      <h3 className={cx("heading")}>
        <Link className={cx(`link-theme-${theme}`)} to="/">На главную страницу</Link>
      </h3>
      <h3 className={cx("heading")}>
        <Link className={cx(`link-theme-${theme}`)} to="/projects/">К списку проектов</Link>
      </h3>
      <div className={cx("flexDiv", "flexDiv-input")}>
        <input className={cx(`input-theme-${theme}`)} value={newTaskName} onChange={taskChangeName} name="name" placeholder="Имя дела" />
        <input className={cx(`input-theme-${theme}`)} value={newTaskDescription} onChange={taskChangeDescription}
          name="description" placeholder="Описание" />
        <button className={cx("button", `button-theme-${theme}`)} onClick={newTaskAdd}>Добавить</button>
      </div>
      <div className={cx("flexDiv")}>
        {Object.keys(tasks).map(taskId => (tasksToCraeate.find(item => item === Number(taskId))) | false ?
          <TaskRedux id={tasks[taskId].id} name={tasks[taskId].name} description={tasks[taskId].description}
            completed={tasks[taskId].completed} /> : false)}
      </div>
    </div>
  );

}

export const TaskListRedux = connect(mapStateToProps, mapDispatchToProps)(TaskList);