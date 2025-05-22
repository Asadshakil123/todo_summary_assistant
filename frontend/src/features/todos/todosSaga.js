import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as todosApi from '../../api/todosApi';
import {
	FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE,
	ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE,
	UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE,
	DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
} from './todosSlice';

// Worker Sagas
function* fetchTodosSaga() {
	try {
		const todos = yield call(todosApi.fetchTodos);
		yield put({ type: FETCH_TODOS_SUCCESS, payload: todos });
	} catch (error) {
		yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
	}
}

function* addTodoSaga(action) {
	try {
		const newTodo = yield call(todosApi.addTodo, action.payload);
		yield put({ type: ADD_TODO_SUCCESS, payload: newTodo });
	} catch (error) {
		yield put({ type: ADD_TODO_FAILURE, payload: error.message });
	}
}

function* updateTodoSaga(action) {
	try {
		const updatedTodo = yield call(todosApi.updateTodo, action.payload.id, action.payload.updatedTodo);
		yield put({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
	} catch (error) {
		yield put({ type: UPDATE_TODO_FAILURE, payload: error.message });
	}
}

function* deleteTodoSaga(action) {
	try {
		yield call(todosApi.deleteTodo, action.payload);
		yield put({ type: DELETE_TODO_SUCCESS, payload: action.payload }); // Pass id to remove from state
	} catch (error) {
		yield put({ type: DELETE_TODO_FAILURE, payload: error.message });
	}
}

// Watcher Sagas
export function* watchTodosSagas() {
	yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
	yield takeEvery(ADD_TODO_REQUEST, addTodoSaga);
	yield takeEvery(UPDATE_TODO_REQUEST, updateTodoSaga);
	yield takeEvery(DELETE_TODO_REQUEST, deleteTodoSaga);
}