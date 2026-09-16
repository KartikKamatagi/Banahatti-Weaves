import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, setReturnUrl } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save current path so user gets returned back after login
    setReturnUrl(location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return children;
}
