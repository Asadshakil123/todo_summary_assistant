import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import { selectIsLoggedIn } from './features/auth/authSlice'; // Import auth selector

import LoginScreen from './components/LoginScreen';
import TodosDashboard from './components/TodosDashboard'; // Your main todos app content
import PrivateRoute from './components/PrivateRoute'; // Protected route component

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Protected Todos Dashboard route */}
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodosDashboard />
            </PrivateRoute>
          }
        />

        {/* Default redirect: if logged in -> todos, else -> login */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/todos" replace /> : <Navigate to="/login" replace />}
        />

        {/* Fallback for any other unmatched routes, redirect to default logic */}
        <Route path="*" element={isLoggedIn ? <Navigate to="/todos" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;