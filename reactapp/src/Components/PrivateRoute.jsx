import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserRoleFromToken = (token) => {
  try {
    if (!token || token.split('.').length !== 3) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  } catch {
    return null;
  }
};

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  if (!token || !role) return <Navigate to="/login" />;
  if (!roles.includes(role)) return <Navigate to="/home" />;

  return children;
};

export default PrivateRoute;