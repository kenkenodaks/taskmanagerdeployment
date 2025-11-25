import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <RegisterPage/> : <Navigate to="/" />} />
      <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    </Routes>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}