import styles from './ProjectList.module.scss';
import React, { Component } from 'react';
import classnames from "classnames/bind"
import {Project} from '../Project/Project';
import { handleProjectNameChange, handleNewProjectAdd } from "../../actions/project_list";

import { connect } from "react-redux";

const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  newProjectName: state.app.newProject.name,
  projectsById: state.app.projectsById,
  theme: state.app.theme
});

const mapDispatchToProps = (dispatch) => ({
  dispatchOnNewProjectNameChange: (newProjectName) => dispatch(handleProjectNameChange(newProjectName)),
  dispatchOnNewProjectAdd: (id) => dispatch(handleNewProjectAdd(id))
}) 

const ProjectList = ({ theme, newProjectName, projectsById, dispatchOnNewProjectNameChange,  dispatchOnNewProjectAdd}) => {

  const projectNameChange = (event) => {
    dispatchOnNewProjectNameChange(event.target.value)
  };

const newProjectAdd = () => {
  const lastProjectId = Object.keys(projectsById).length;
  dispatchOnNewProjectAdd(lastProjectId)
};

  return (

        <div>
          <div className={cx("flexDiv", "flexDiv-input")}>
            <input className={cx(`input-theme-${theme}`)} value={newProjectName} onChange={projectNameChange} name="name" placeholder="Имя проекта" />
            <button className={cx("button", `button-theme-${theme}`)} onClick={newProjectAdd} on>Добавить</button>
          </div>
          <div className={cx("flexDiv")}>
            {Object.keys(projectsById).map(projectId => <Project project={projectsById[projectId]} />)}
          </div>
        </div>

  );
}

export const ProjectListRedux = connect(mapStateToProps, mapDispatchToProps)(ProjectList);