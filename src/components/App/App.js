import styles from "./App.module.scss";
import classnames from "classnames/bind"
import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import { basicTheme, ThemeContext} from './ThemeContext';

const cx = classnames.bind(styles)

class App extends React.Component {
  state = {
    theme: basicTheme,
  }

  handleClick = () => {
    const current = (this.state.theme === 'light')? 'dark': 'light';
    this.setState({theme: current})
    console.log(this.state.theme)
  }

  render() {
    return(
    <div className={cx(`div-theme-${this.state.theme}`)}>
      <h1 className={cx("heading")}>Список дел</h1>
      <button className={cx("changeTheme")} onClick={this.handleClick}>Сменить тему</button>
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <TaskList />
        </ThemeContext.Provider>
      </div>
    </div>
    )
  }
}

export default App;