'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import LoginPage from '@/app/login/page';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true 
}: Readonly<AuthGuardProps>) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!requireAuth) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : <LoginPage />;
  }

  return <>{children}</>;
}