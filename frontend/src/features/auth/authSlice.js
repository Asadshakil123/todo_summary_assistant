// Action Types
export const LOGIN_REQUEST = 'auth/loginRequest';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAILURE = 'auth/loginFailure';
export const LOGOUT = 'auth/logout';
export const CHECK_AUTH_STATUS = 'auth/checkAuthStatus'; // To check localStorage on app load

// Initial State
// Initialize isLoggedIn by checking localStorage on app load
const initialState = {
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
	user: localStorage.getItem('isLoggedIn') === 'true' ? { username: 'user' } : null, // Dummy user if logged in
	loading: false,
	error: null,
};

// Action Creators
export const loginRequest = (username, password, navigate) => ({
	type: LOGIN_REQUEST,
	payload: { username, password, navigate },
});
export const loginSuccess = (user) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});
export const loginFailure = (error) => ({
	type: LOGIN_FAILURE,
	payload: error,
});
export const logout = () => ({ type: LOGOUT });
export const checkAuthStatus = () => ({ type: CHECK_AUTH_STATUS });

// Reducer
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, loading: true, error: null };
		case LOGIN_SUCCESS:
			return { ...state, loading: false, isLoggedIn: true, user: action.payload };
		case LOGIN_FAILURE:
			return { ...state, loading: false, isLoggedIn: false, user: null, error: action.payload };
		case LOGOUT:
			return { ...state, isLoggedIn: false, user: null, error: null };
		default:
			return state;
	}
};

export default authReducer;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;