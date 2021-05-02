import './Task.css';
import React, { Component } from 'react';

const Task = ({id, name, description, completed, changeStatus}) => {
    const handleClick = () => {
      changeStatus(id)
    };
    const status = completed? "Сделано": "Не сделано";
    const par = "jnsdvkjnsd"
    return(
    <span className="spanTask">
      <div>
        <span className='id'>{id}. </span>
        <span className='name'>{name}</span>
      </div>
      <div className='description'>{description}</div>
      <div className='completed'>{completed}</div>
      <button className='button' onClick={handleClick}>{status}</button>
    </span>
    )
  }

  export default Task;