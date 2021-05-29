import styles from './TaskList.module.scss';
import React, { Component } from 'react';
import Task from '../Task/Task';
import classnames from "classnames/bind"
import { ThemeContext } from "../App/ThemeContext";
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

const cx = classnames.bind(styles)

const TaskList = ({ newTaskName, newTaskDescription, inputChange, addTask, changeStatus, tasks, projects, match }) => {

  const { projectId } = useParams();
  if (!Number.isInteger(Number(projectId)) | (projectId > Object.keys(projects).length)) {
    return (
      <Redirect to="/404/" />
    )
  }
  const tasksToCraeate = projects[projectId].tasks;

  const addTaskByProjectId = () => {
    addTask(projectId);
  }


  return (
    <ThemeContext.Consumer>
      {(theme) =>
        <div>
          <h2 className={cx("heading")}>Проект: {projects[projectId].name}</h2>
          <h3 className={cx("heading")}>
            <Link className={cx(`link-theme-${theme}`)} to="/">На главную страницу</Link>
          </h3>
          <h3 className={cx("heading")}>
            <Link className={cx(`link-theme-${theme}`)} to="/projects/">К списку проектов</Link>
          </h3>
          <div className={cx("flexDiv", "flexDiv-input")}>
            <input className={cx(`input-theme-${theme}`)} value={newTaskName} onChange={inputChange} name="name" placeholder="Имя дела" />
            <input className={cx(`input-theme-${theme}`)} value={newTaskDescription} onChange={inputChange}
              name="description" placeholder="Описание" />
            <button className={cx("button", `button-theme-${theme}`)} onClick={addTaskByProjectId}>Добавить</button>
          </div>
          <div className={cx("flexDiv")}>
            {Object.keys(tasks).map(taskId => (tasksToCraeate.find(item => item === Number(taskId))) | false ?
              <Task id={tasks[taskId].id} name={tasks[taskId].name} description={tasks[taskId].description}
                completed={tasks[taskId].completed} changeStatus={changeStatus} /> : false)}
          </div>
        </div>
      }
    </ThemeContext.Consumer>
  );

}

export default TaskList;