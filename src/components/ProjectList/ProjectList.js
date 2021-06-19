import styles from './ProjectList.module.scss';
import React, { Component } from 'react';
import classnames from "classnames/bind"
import { ThemeContext } from "../App/ThemeContext";
import Project from '../Project/Project';

const cx = classnames.bind(styles)

class ProjectList extends React.Component {

  static contextType = ThemeContext;

  render() {
    return (
      <div>
        <div className={cx("flexDiv", "flexDiv-input")}>
          <input className={cx(`input-theme-${this.context}`)} value={this.props.newProjectName} onChange={this.props.inputChange} name="name" placeholder="Имя проекта" />
          <button className={cx("button", `button-theme-${this.context}`)} onClick={this.props.addProject} on>Добавить</button>
        </div>
        <div className={cx("flexDiv")}>
          {Object.keys(this.props.projectsById).map(projectId => 
          <Project project={this.props.projectsById[projectId]}/>)}
        </div>
      </div>
    );
  }
}

export default ProjectList;