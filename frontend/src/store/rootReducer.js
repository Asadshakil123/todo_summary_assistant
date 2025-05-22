import { combineReducers } from 'redux';
import todosReducer from '../features/todos/todosSlice';
import slackReducer from '../features/slack/slackSlice';
import authReducer from '../features/auth/authSlice'; // Import auth reducer

const rootReducer = combineReducers({
	todos: todosReducer,
	slack: slackReducer,
	auth: authReducer, // Add auth reducer
});

export default rootReducer;