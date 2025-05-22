import { all } from 'redux-saga/effects';
import { watchTodosSagas } from '../features/todos/todosSaga';
import { watchSlackSagas } from '../features/slack/slackSaga';
import { watchAuthSagas } from '../features/auth/authSaga';

export default function* rootSaga() {
	yield all([
		watchTodosSagas(),
		watchSlackSagas(),
		watchAuthSagas(),
	]);
}