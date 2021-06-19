import styles from './Task.module.scss';
import React, { Component } from 'react';
import classnames from "classnames/bind"
import { handleTaskStatusChange } from "../../actions/task";
import { connect } from "react-redux";

const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  theme: state.app.theme,
})
const mapDispatchToProps = (dispatch) => ({
  dispatchOnTaskStatusChange: (taskId) => dispatch(handleTaskStatusChange(taskId)),
})

const Task = ({ id, name, description, completed, dispatchOnTaskStatusChange, theme }) => {
  const taskStatusChange = () => {
    dispatchOnTaskStatusChange(id)
  };
  const status = completed ? "Сделано" : "Не сделано";
  return (
    <span className={cx("spanTask", `spanTask-theme-${theme}`)}>
      <div>
        <span className={cx(`id-theme-${theme}`)}>{id}. </span>
        <span className={cx(`name-theme-${theme}`)}>{name}</span>
      </div>
      <div className={cx(`description-theme-${theme}`)}>{description}</div>
      <button className={cx(`button-theme-${theme}`,
        `button-theme-${theme}-${completed ? "done" : "undone"}`)} onClick={taskStatusChange}>{status}</button>
    </span>
  )
}

export const TaskRedux = connect(mapStateToProps, mapDispatchToProps)(Task);