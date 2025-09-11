// src/components/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from 'components/login/LoginForm';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="text-center py-12 animate-pulse">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Loader className="w-12 h-12 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
          <LoginForm />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;