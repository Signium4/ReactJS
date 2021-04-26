import logo from './logo.svg';
import './App.css';
import React from 'react';

let listOfTasks = [
  {
    id: 1,
    name: 'Домашняя работа по ReactJS',
    description: 'Сделать ДЗ3 к 22.04 ',
    completed: false
  },
  {
    id: 2,
    name: 'GitHub',
    description: 'Посмотреть парочку статей про работу с GitHub, что-нибудь на YouTube',
    completed: false
  },
  {
    id: 3,
    name: 'Экзамен на военке',
    description: 'Посмотреть материалы по всп, написать билеты',
    completed: true
  },
  {
    id: 4,
    name: 'ДЗ по менеджменту',
    description: 'Выбрать сферу компаний для дз по стратегическому менеджменту',
    completed: true
  },
  {
    id: 5,
    name: 'Уборка квартиры',
    description: 'Пропылесосить, стереть пыль, помыть полы в квартире',
    completed: true
  },
  {
    id: 6,
    name: 'Уход за домашним скотом',
    description: 'Налить воды муравьям и улиткам, покормить улиток',
    completed: false
  },
  {
    id: 7,
    name: 'Поход',
    description: 'Сходить в магазин за продуктами',
    completed: false
  },
  {
    id: 8,
    name: 'Уроки',
    description: 'Проверить домашнюю работу у брата',
    completed: false
  },
  {
    id: 9,
    name: 'Прослушка',
    description: 'Послушать новый небольшой мюзикл от группы "Дайте Танк (!)"',
    completed: false
  },
  {
    id: 10,
    name: 'План',
    description: 'Составить список дел',
    completed: true
  },
]

const Task = ({id, name, description, completed}) => (
  <span className="spanTask">
    <div>
      <span className='id'>{id}. </span>
      <span className='name'>{name}</span>
    </div>
    <div className='description'>{description}</div>
    <div className='completed'>{completed}</div>
    <button className='button' onClick={() => {console.log('Task ' + id + ' completed status=' + completed)}}>Status</button>
  </span>
)

class MyToDoList extends React.Component {
  state={
    tasks: listOfTasks
  }

  render() {
    return (
      <div>
        {this.state.tasks.map(task => <Task id={task.id} name={task.name} description={task.description}
        completed={task.completed} />)}
      </div>
    );
  }
}


function App() {
  return (
    <div>
      <h1 className="heading">Список дел</h1>
      <div>
        <MyToDoList />
      </div>
    </div>
  );
}

export default App;
