import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  roles: Array<'admin' | 'seller' | 'customer'>;
  element: React.ReactNode;
}

const ProtectedRoute = ({ element, roles }: ProtectedRouteProps) => {
  const { user, refreshToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const tokenExpiry = accessToken && parseJwt(accessToken).exp;
      if (tokenExpiry && tokenExpiry * 1000 < Date.now()) {
        await refreshToken();
      }
    };

    checkToken();
  }, []);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return <>{element}</>;
};

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(jsonPayload);
};

export default ProtectedRoute;
