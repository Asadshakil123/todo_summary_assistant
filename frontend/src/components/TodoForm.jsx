import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoRequest, updateTodoRequest } from '../features/todos/todosSlice';

function TodoForm({ todoToEdit, onFinishEdit }) {
	const [title, setTitle] = useState(todoToEdit ? todoToEdit.title : '');
	const [description, setDescription] = useState(todoToEdit ? todoToEdit.description : '');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return; // Prevent adding empty todos

		if (todoToEdit) {
			// If in edit mode, dispatch update action
			dispatch(updateTodoRequest(todoToEdit.id, { ...todoToEdit, title, description, completed: todoToEdit.completed }));
			onFinishEdit(); // Callback to exit edit mode
		} else {
			// If in add mode, dispatch add action and clear input
			dispatch(addTodoRequest({ title, description, completed: false }));
			setTitle('');
			setDescription('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-5 flex"> {/* Added flex for layout */}
			<div className="flex flex-row w-full justify-between">
				<div className="flex flex-col w-full">
					<div className="flex flex-col mb-4">
						<label htmlFor="inputTitle" className="mb-1">Title</label>
						<input
							type="text"
							id="inputTitle"
							value={title}
							onChange={(e) => setText(e.target.value)}
							placeholder="todo title..."
							className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Tailwind classes for input
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="inputDescription" className="mb-1">Description</label>
						<input
							type="text"
							id="inputDescription"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="todo description..."
							className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Tailwind classes for input
						/>
					</div>
				</div>
				<div className="w-40 flex items-end">
					<button
						type="submit"
						className="w-full px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-200" // Tailwind classes for button
					>
						{todoToEdit ? 'Update Todo' : 'Add Todo'}
					</button>
				</div>

			</div>
		</form>
	);
}

export default TodoForm;