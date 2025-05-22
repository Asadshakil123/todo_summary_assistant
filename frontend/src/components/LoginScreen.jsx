import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest, selectAuthLoading, selectAuthError, selectIsLoggedIn } from '../features/auth/authSlice';

function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/todos', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest(username, password, navigate));
    };

    return (
        <div className="flex justify-center border border-gray-300 rounded-md p-6">
            <div className="w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-1 text-left">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-1 text-left">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2.5 bg-blue-600 text-white border-none rounded cursor-pointer text-base hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-5 text-sm text-gray-600 text-center">
                    Hint: user / password
                </p>
            </div>
        </div>
    );
}

export default LoginScreen;