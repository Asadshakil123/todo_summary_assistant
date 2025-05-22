import axios from 'axios';

const API_BASE_URL = 'http://localhost:9001/api';

export const fetchTodos = async () => {
	const response = await axios.get(`${API_BASE_URL}/todos`);
	return response.data;
};

export const addTodo = async (todo) => {
	const response = await axios.post(`${API_BASE_URL}/todos`, todo);
	return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
	// Assuming your backend supports PUT or PATCH for update
	// If your backend uses POST for update, adjust this
	const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updatedTodo);
	return response.data;
};

export const deleteTodo = async (id) => {
	const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
	return response.data;
};