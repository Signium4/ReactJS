import styles from './Project.module.scss';
import React, { Component } from 'react';
import classnames from "classnames/bind"
import { ThemeContext } from '../App/ThemeContext';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";

const cx = classnames.bind(styles)

const Project = ({project}) => {
    return(
    <ThemeContext.Consumer>
      {(theme) =>
      <span className={cx("spanTask", `spanTask-theme-${theme}`)}>
        <Link to={`/projects/${project.id}`} className={cx(`link-theme-${theme}`)} title='Посмотреть все задачи'>
          <span className={cx(`id-theme-${theme}`)}>{project.id}. </span>
          <span className={cx(`name-theme-${theme}`)}>{project.name}</span>
        </Link>
      </span>}
    </ThemeContext.Consumer>
    )
  }

  export default Project;