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
  const [filter, setFilter] = useState('all');

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

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const remainingTasks = todos.filter(todo => !todo.completed).length;
  const hasCompletedTasks = todos.some(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <div className="todo-list-header-left">
          <span className="todo-count">
            {remainingTasks} {remainingTasks === 1 ? 'task' : 'tasks'} remaining
          </span>
          <select 
            className="todo-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {hasCompletedTasks && (
          <button 
            className="clear-completed-button"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
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
        {filteredTodos.length === 0 ? (
          <li className="todo-list-empty">
            No todos yet! Add one to get started.
          </li>
        ) : (
          filteredTodos.map((todo) => (
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
