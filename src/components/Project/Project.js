import styles from './Project.module.scss';
import React, { Component } from 'react';
import classnames from "classnames/bind"
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  theme: state.app.theme
});

const ProjectComponent = ({project, theme}) => {
    return(
      <span className={cx("spanTask", `spanTask-theme-${theme}`)}>
        <Link to={`/projects/${project.id}`} className={cx(`link-theme-${theme}`)} title='Посмотреть все задачи'>
          <span className={cx(`id-theme-${theme}`)}>{project.id}. </span>
          <span className={cx(`name-theme-${theme}`)}>{project.name}</span>
        </Link>
      </span>
    )
  }

  export const Project = connect(mapStateToProps)(ProjectComponent);