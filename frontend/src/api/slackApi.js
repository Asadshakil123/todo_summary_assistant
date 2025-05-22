import axios from 'axios';

const API_BASE_URL = 'http://localhost:9001/api/todos';

export const sendSummaryToSlack = async () => {
	const response = await axios.post(`${API_BASE_URL}/summarize`);
	return response.data;
};