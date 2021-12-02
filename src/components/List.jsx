import React from 'react';
import classNames from 'classnames';
import axios from 'axios';


import removeBtn from '../assets/img/remove.svg';

import './List.scss';

import Badge from './Badge';

function List({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) {
  const removeList = (item) => {
    if (window.confirm('Ты точно хочешь это ?')) {
      axios.delete('https://danber-todo.herokuapp.com/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active ? item.active : activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}>
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.tasks && `${item.tasks.length === 0 ? '' : `(${item.tasks.length})`} `}
            {item.name}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon "
              src={removeBtn}
              alt="remove-task"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
