// Action Types
export const FETCH_TODOS_REQUEST = 'todos/fetchTodosRequest';
export const FETCH_TODOS_SUCCESS = 'todos/fetchTodosSuccess';
export const FETCH_TODOS_FAILURE = 'todos/fetchTodosFailure';

export const ADD_TODO_REQUEST = 'todos/addTodoRequest';
export const ADD_TODO_SUCCESS = 'todos/addTodoSuccess';
export const ADD_TODO_FAILURE = 'todos/addTodoFailure';

export const UPDATE_TODO_REQUEST = 'todos/updateTodoRequest';
export const UPDATE_TODO_SUCCESS = 'todos/updateTodoSuccess';
export const UPDATE_TODO_FAILURE = 'todos/updateTodoFailure';

export const DELETE_TODO_REQUEST = 'todos/deleteTodoRequest';
export const DELETE_TODO_SUCCESS = 'todos/deleteTodoSuccess';
export const DELETE_TODO_FAILURE = 'todos/deleteTodoFailure';

// Action Creators
export const fetchTodosRequest = () => ({ type: FETCH_TODOS_REQUEST });
export const fetchTodosSuccess = (todos) => ({ type: FETCH_TODOS_SUCCESS, payload: todos });
export const fetchTodosFailure = (error) => ({ type: FETCH_TODOS_FAILURE, payload: error });

export const addTodoRequest = (todo) => ({ type: ADD_TODO_REQUEST, payload: todo });
export const addTodoSuccess = (todo) => ({ type: ADD_TODO_SUCCESS, payload: todo });
export const addTodoFailure = (error) => ({ type: ADD_TODO_FAILURE, payload: error });

export const updateTodoRequest = (id, updatedTodo) => ({ type: UPDATE_TODO_REQUEST, payload: { id, updatedTodo } });
export const updateTodoSuccess = (todo) => ({ type: UPDATE_TODO_SUCCESS, payload: todo });
export const updateTodoFailure = (error) => ({ type: UPDATE_TODO_FAILURE, payload: error });

export const deleteTodoRequest = (id) => ({ type: DELETE_TODO_REQUEST, payload: id });
export const deleteTodoSuccess = (id) => ({ type: DELETE_TODO_SUCCESS, payload: id });
export const deleteTodoFailure = (error) => ({ type: DELETE_TODO_FAILURE, payload: error });


// Initial State
const initialState = {
	items: [],
	loading: false,
	error: null,
};

// Reducer
const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TODOS_REQUEST:
		case ADD_TODO_REQUEST:
		case UPDATE_TODO_REQUEST:
		case DELETE_TODO_REQUEST:
			return { ...state, loading: true, error: null };

		case FETCH_TODOS_SUCCESS:
			return { ...state, loading: false, items: action.payload };
		case ADD_TODO_SUCCESS:
			return { ...state, loading: false, items: [...state.items, action.payload] };
		case UPDATE_TODO_SUCCESS:
			return {
				...state,
				loading: false,
				items: state.items.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo
				),
			};
		case DELETE_TODO_SUCCESS:
			return {
				...state,
				loading: false,
				items: state.items.filter((todo) => todo.id !== action.payload),
			};

		case FETCH_TODOS_FAILURE:
		case ADD_TODO_FAILURE:
		case UPDATE_TODO_FAILURE:
		case DELETE_TODO_FAILURE:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default todosReducer;

// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectTodosLoading = (state) => state.todos.loading;
export const selectTodosError = (state) => state.todos.error;