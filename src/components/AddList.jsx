import React, { useState } from 'react';
import axios from 'axios';

import Badge from './Badge';
import List from './List';

import closeSvg from '../assets/img/close.svg';

import './AddList.scss';

function AddList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, setSelectColor] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectColor(colors[0].id);
  };

  const addLists = () => {
    if (!inputValue.trim()) {
      alert('Заполни задачу!');
      return;
    }
    setIsLoading(true);
    axios
      .post('https://danber-todo.herokuapp.com/lists', { name: inputValue, colorId: selectedColor })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Не удалось добавить список!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  return (
    <div className="add-list">
      <List
        onClick={handleVisiblePopup}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
              className="list__add-folder"
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить папку',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img onClick={onClose} src={closeSvg} alt="" className="add-list__popup-close" />
          <input
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Название Папки"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addLists} className="button">
            {isLoading ? 'Загрузка...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddList;
