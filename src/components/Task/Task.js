import styles from './Task.module.scss';
import React, { Component } from 'react';
import classnames from "classnames/bind"
import { ThemeContext } from '../App/ThemeContext';

const cx = classnames.bind(styles)

const Task = ({id, name, description, completed, changeStatus}) => {
    const handleClick = () => {
      changeStatus(id)
    };
    const status = completed? "Сделано": "Не сделано";
    return(
    <ThemeContext.Consumer>
      {(theme) =>
      <span className={cx("spanTask", `spanTask-theme-${theme}`)}>
        <div>
          <span className={cx(`id-theme-${theme}`)}>{id}. </span>
          <span className={cx(`name-theme-${theme}`)}>{name}</span>
        </div>
        <div className={cx(`description-theme-${theme}`)}>{description}</div>
        <button className={cx(`button-theme-${theme}`,
        `button-theme-${theme}-${completed? "done": "undone"}`)} onClick={handleClick}>{status}</button>
      </span>}
    </ThemeContext.Consumer>
    )
  }

  export default Task;