import React from 'react';
import axios from 'axios';

import addSvg from '../assets/img/add.svg';

function AddTaskForm({ list, AddTask }) {
  const [FormVisible, setFormVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState();

  const toggleFormVisible = () => {
    setFormVisible(!FormVisible);
    setInputValue('');
  };

  const addTask = () => {
    const obj = { listId: list.id, text: inputValue, completed: false };
    setIsLoading(true);
    axios
      .post('https://danber-todo.herokuapp.com/tasks', obj)
      .then(({ data }) => {
        AddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert('Не удалось добавить задачу');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {FormVisible ? (
        <div className="tasks__form-block">
          <input
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст задачи"
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisible} className="button button-grey">
            Отмена
          </button>
        </div>
      ) : (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add tasks"></img>
          <span>Новая задача</span>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
