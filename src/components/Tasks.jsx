import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import editSvg from '../assets/img/edit.svg';

import './Tasks.scss';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

function Tasks({
  list,
  onEditTitle,
  AddTask,
  onRemoveTask,
  onEditTask,
  withoutEmpty,
  onCompleteTask,
}) {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (!newTitle) {
      return;
    }
    if (newTitle.trim()) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('https://danber-todo.herokuapp.com/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit" />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют!</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} AddTask={AddTask} />
      </div>
    </div>
  );
}

export default Tasks;
