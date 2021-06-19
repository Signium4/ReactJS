import styles from "./DisplayComponent.module.scss";
import classnames from "classnames/bind"
import React, { Component } from 'react';
import { TaskListRedux } from '../TaskList/TaskList';
import { ProjectListRedux } from '../ProjectList/ProjectList';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";

import { handleThemeChange } from "../../actions/theme";
import { connect } from "react-redux";

const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
    theme: state.app.theme
});

const mapDispatchToProps = (dispatch) => ({
    dispatchOnThemeChange: (theme) => dispatch(handleThemeChange(theme))
});

const DisplayComponent = ({theme, dispatchOnThemeChange}) => {
    
    const themeChange = () => {
        dispatchOnThemeChange(theme)
    }

    return (
        <BrowserRouter>
            <Route path="/">
                <div className={cx(`div-theme-${theme}`)}>
                    <h1 className={cx("heading")}>Список дел</h1>
                    <button className={cx("changeTheme")} onClick={themeChange}>Сменить тему</button>
                </div>
            </Route>
            <Route exact path="/">
                <div className={cx(`div-theme-${theme}`)}>
                    <h2 className={cx("headingLink")}>
                        <Link className={cx(`link-theme-${theme}`)} to="/projects/">Мои проекты</Link>
                    </h2>
                </div>
            </Route>
            <Route exact path="/projects/">
                <div className={cx(`div-theme-${theme}`)}>
                    <h2 className={cx("heading-small")}>Мои проекты</h2>
                    <button className={cx("changeTheme")} onClick={themeChange}>Сменить тему</button>
                    <ProjectListRedux />
                </div>
            </Route>
            <Route exact path="/projects/:projectId">
                <div className={cx(`div-theme-${theme}`)}>
                    <div>
                        <TaskListRedux />
                    </div>
                </div>
            </Route>
            <Route exact path="/404/">
                <h2 className={cx("headingLink")}>
                    <Link className={cx(`link-theme-${theme}`)} to="/projects/">К списку проектов</Link>
                </h2>
                <h2 className={cx("headingLink")}>
                    <Link className={cx(`link-theme-${theme}`)} to="/">На главную страницу</Link>
                </h2>
                <span className={cx('mistake')}>Oшибка 404</span>
                <span className={cx('mistake-small', 'mistake')}>одна ошибка - и ты ошибся</span>
            </Route>
        </BrowserRouter>
    )
}
const DisplayComponentRedux = connect(mapStateToProps, mapDispatchToProps)(DisplayComponent);
export default DisplayComponentRedux;