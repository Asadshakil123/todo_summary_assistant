// src/components/TodosDashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for logout redirect
import {
  fetchTodosRequest,
  selectAllTodos,
  selectTodosLoading,
  selectTodosError,
} from '../features/todos/todosSlice';
import { sendSlackSummaryRequest, selectSlackLoading } from '../features/slack/slackSlice';
import { logout } from '../features/auth/authSlice'; // Import logout action creator

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import SlackMessage from './SlackMessage';

function TodosDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate for logout
  const todos = useSelector(selectAllTodos);
  const todosLoading = useSelector(selectTodosLoading);
  const todosError = useSelector(selectTodosError);
  const slackLoading = useSelector(selectSlackLoading);

  useEffect(() => {
    dispatch(fetchTodosRequest()); // Fetch todos when the component mounts
  }, [dispatch]);

  const handleGenerateSummary = () => {
    dispatch(sendSlackSummaryRequest());
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login', { replace: true }); // Redirect to login after logout
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-5 border border-gray-300 rounded-lg shadow-md font-sans">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold me-4">My Todo List</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 mt-2 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <TodoForm />

      <button
        onClick={handleGenerateSummary}
        disabled={slackLoading || todosLoading}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-md cursor-pointer mb-5 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        {slackLoading ? 'Sending...' : 'Generate & Send Slack Summary'}
      </button>

      <SlackMessage />

      {todosLoading && <p className="text-center text-gray-500">Loading todos...</p>}
      {todosError && <p className="text-center text-red-500">Error: {todosError}</p>}

      {!todosLoading && !todosError && todos.length === 0 && (
        <p className="text-center text-gray-600">No todos yet! Add one above.</p>
      )}

      {!todosLoading && !todosError && Array.isArray(todos) && todos?.length > 0 && (
        <ul className="list-none p-0">
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodosDashboard;