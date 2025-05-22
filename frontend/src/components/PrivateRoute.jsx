import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/auth/authSlice'; // Import selector from auth slice

function PrivateRoute({ children }) {
	const isLoggedIn = useSelector(selectIsLoggedIn); // Get isLoggedIn from Redux state

	return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;