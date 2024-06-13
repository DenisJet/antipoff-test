import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/register' replace />;
  }

  return children;
};
