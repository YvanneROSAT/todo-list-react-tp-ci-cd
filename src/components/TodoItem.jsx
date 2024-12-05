import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        className="todo-item-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className="todo-item-text"
      >
        {todo.text}
      </span>
      <button className="todo-item-delete" onClick={() => onDelete(todo.id)}>×</button>
    </li>
  );
}

export default TodoItem;
