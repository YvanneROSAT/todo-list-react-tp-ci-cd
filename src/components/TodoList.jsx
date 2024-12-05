import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function readFromLocaleStorage() {
  const todos = localStorage.getItem('todos');
  console.log(todos)
  return todos ? JSON.parse(todos) : [];
}

function writeToLocaleStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function TodoList() {
  const [todos, setTodos] = useState(readFromLocaleStorage());
  const [inputValue, setInputValue] = useState('');

  useEffect(() => writeToLocaleStorage(todos), [todos])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <form className="todo-list-form" onSubmit={handleSubmit}>
        <input
          className="todo-list-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button className="todo-list-submit" type="submit">Add</button>
      </form>
      <ul className="todo-list-items">
        {todos.length === 0 ? (
          <li className="todo-list-empty">
            No todos yet! Add one to get started.
          </li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
