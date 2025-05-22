import { call, put, takeLatest } from 'redux-saga/effects';

// Dummy authentication function (replace with your actual API call)
const authenticateUser = async (username, password) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (username === 'user' && password === 'password') {
				resolve({ username }); // Simulate successful login
			} else {
				resolve(null); // Simulate failed login
			}
		}, 700); // Simulate network delay
	});
};

// Worker Saga for login
function* loginWorkerSaga(action) {
	try {
		const { username, password, navigate } = action.payload;
		const user = yield call(authenticateUser, username, password);

		if (user) {
			yield put({ type: 'auth/loginSuccess', payload: user }); // Use the actual type string
			localStorage.setItem('isLoggedIn', 'true'); // Persist login state
			navigate('/todos'); // Navigate on success
		} else {
			yield put({ type: 'auth/loginFailure', payload: 'Invalid username or password.' }); // Use the actual type string
			localStorage.removeItem('isLoggedIn'); // Ensure no persistence on failure
		}
	} catch (error) {
		yield put({ type: 'auth/loginFailure', payload: error.message || 'An unexpected error occurred.' }); // Use the actual type string
		localStorage.removeItem('isLoggedIn');
	}
}

// Worker Saga for logout
function* logoutWorkerSaga() {
	localStorage.removeItem('isLoggedIn'); // Clear persisted state
	// No need to dispatch a failure/success, the reducer handles the state change
	// If you had a logout API, you'd call it here
	// We'll rely on the PrivateRoute and App.jsx to redirect to /login
}

// Watcher Sagas
export function* watchAuthSagas() {
	yield takeLatest('auth/loginRequest', loginWorkerSaga); // Use the actual type string
	yield takeLatest('auth/logout', logoutWorkerSaga); // Use the actual type string
}