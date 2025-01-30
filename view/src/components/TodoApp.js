import React, { useState, useEffect } from 'react';
import { getTodos, removeTodo, createTodo } from '../util';
import './App.css';

const TodoApp = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState();
  const [error, setError] = useState();

  // update view from model w/ controller
  const fetchTodos = async () => {
  // console.log('fetchingTodos');
    const res = await getTodos();
    if (res.error) {
      setError(res.error.name);
    }
    setTodoList(res.data);
  };

  // send user action to controller
  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      fetchTodos();
    } catch (err) {
      setError(err);
    }
  };

  // send user action to controller
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    const data = new FormData(e.currentTarget);
    try {
      data.set('description', todo.description);
      data.set('created_at', `${new Date().toISOString()}`);
      const newTodo = await createTodo(data);
      if (newTodo.error) {
        setError(newTodo.error);
      }
      setTodo({ description: '' });
      fetchTodos();
    } catch (err) {
      setError(err);
    }
  };

  const logout = async () => {
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials (cookies) with the request
    });
    if (response.ok) {
      console.log('Logout successful');
      window.location = '/auth';
    } else {
      // Handle logout error
      const data = await response.json();
      console.error('Logout failed:', data.message);
      alert(`Logout failed: ${data.message}`);
    }
  }

  useEffect(() => {
  console.log('callfetchingTodos');
  fetchTodos();
},[]);
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) => setTodo({ ...todo, description: event.target.value })
          }
        ></input>
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList?.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => {
              handleDelete(todoItem.todo_id);
            }}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
      <button onClick={logout} type="submit">Logout</button>

    </div>
  );
};

export default TodoApp;
