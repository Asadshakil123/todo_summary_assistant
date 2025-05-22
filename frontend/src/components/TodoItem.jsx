import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoRequest, updateTodoRequest } from '../features/todos/todosSlice';
import TodoForm from './TodoForm'; // Import TodoForm for editing

function TodoItem({ todo }) {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);

	const handleDelete = () => {
		dispatch(deleteTodoRequest(todo.id));
	};

	const handleToggleComplete = () => {
		dispatch(updateTodoRequest(todo.id, { ...todo, completed: !todo.completed }));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleFinishEdit = () => {
		setIsEditing(false);
	};

	if (isEditing) {
		return <TodoForm todoToEdit={todo} onFinishEdit={handleFinishEdit} />;
	}

	// Tailwind classes for the list item, conditionally applied for completed state
	const listItemClasses = `
    flex items-center justify-between p-2
    border-b border-gray-200
    ${todo.completed ? 'bg-black/75 text-white-500' : 'bg-black text-white'}
  `;

	return (
		<li className={listItemClasses.trim()}>
			<div className="flex flex-row">
				<span className="flex items-center">
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={handleToggleComplete}
						className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
					/>
				</span>
				<span className={`flex flex-col ${todo.completed && 'line-through'}`}>
					<span className="flex items-center text-gray-100 text-base">
						{todo.title}
					</span>
					<span className="flex items-center text-white text-xl">
						{todo.description}
					</span>
				</span>
			</div>
			<div className="flex flex-row">
				<button
					onClick={handleEdit}
					className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200" // Tailwind classes for Edit button
				>
					Edit
				</button>
				<button
					onClick={handleDelete}
					className="px-3 py-1 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200" // Tailwind classes for Delete button
				>
					Delete
				</button>
			</div>
		</li>
	);
}

export default TodoItem;